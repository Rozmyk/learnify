import { createClient } from '@/utils/supabase/server'

export const fetchFavoriteCourses = async (userId: string) => {
	const supabase = await createClient()

	const { data: favCourses, error: favCoursesError } = await supabase
		.from('favCourses')
		.select('course_id')
		.eq('user_id', userId)

	if (favCoursesError) {
		console.error('Error fetching favorite courses:', favCoursesError)
		return { error: favCoursesError.message }
	}

	if (favCourses) {
		const courseIds = favCourses.map((fav: { course_id: string }) => fav.course_id)

		const { data: coursesData, error: coursesError } = await supabase.from('course').select('*').in('id', courseIds)

		if (coursesError) {
			console.error('Error fetching course details:', coursesError)
			return { error: coursesError.message }
		}

		return { data: coursesData }
	}

	return { data: [] }
}
