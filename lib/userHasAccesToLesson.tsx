import { createClient } from '@/utils/supabase/server'
async function userHasAccessToLesson(lessonId: string, userId: string) {
	const supabase = await createClient()
	const { data: lesson, error: lessonError } = await supabase
		.from('lessons')
		.select('id, course_id')
		.eq('id', lessonId)
		.single()

	if (lessonError || !lesson) return false

	const { data: userCourse, error: userError } = await supabase
		.from('owned_courses')
		.select('id')
		.eq('user_id', userId)
		.eq('course_id', lesson.course_id)
		.single()

	return !!userCourse
}
export default userHasAccessToLesson
