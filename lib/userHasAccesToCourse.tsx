import { createClient } from '@/utils/supabase/server'
async function userHasAccessToCourse(courseSlug: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		return false
	}
	const { data: course, error: courseError } = await supabase
		.from('course')
		.select('id')
		.eq('slug', courseSlug)
		.single()
	if (courseError || !course) return false

	const { data: ownedCourse, error: ownedCourseError } = await supabase
		.from('owned_courses')
		.select('id')
		.eq('course_id', course.id)
		.eq('user_id', user.id)
		.maybeSingle()

	if (ownedCourseError) {
		return false
	}
	return !!ownedCourse
}
export default userHasAccessToCourse
