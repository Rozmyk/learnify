import { createClient } from '@/utils/supabase/server'

async function lastViewedLesson(courseSlug: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) return false

	const { data: course, error: courseError } = await supabase
		.from('course')
		.select('id')
		.eq('slug', courseSlug)
		.single()

	if (courseError || !course) return false

	const { data: lastLesson, error: lastLessonError } = await supabase
		.from('user_lessons_progress')
		.select('lesson_id')
		.eq('user_id', user.id)
		.eq('course_id', course.id)
		.maybeSingle()

	const { data: sections, error: sectionsError } = await supabase
		.from('sections')
		.select('lessons(*)')
		.eq('course_id', course.id)
		.order('order', { ascending: true })

	if (!sections || sections.length === 0) return false

	for (let i = 0; i < sections.length; i++) {
		const section = sections[i]
		const lessonIndex = section.lessons.findIndex(lesson => lesson.id === lastLesson?.lesson_id)

		if (lessonIndex !== -1) {
			if (lessonIndex < section.lessons.length - 1) {
				return section.lessons[lessonIndex + 1].id
			}

			if (i < sections.length - 1 && sections[i + 1].lessons.length > 0) {
				return sections[i + 1].lessons[0].id
			}
		}
	}

	const firstLesson = sections[0]?.lessons[0]
	return firstLesson ? firstLesson.id : false
}

export default lastViewedLesson
