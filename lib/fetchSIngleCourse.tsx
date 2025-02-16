import { createClient } from '@/utils/supabase/server'
import { addRatingsToCourses } from './calcRatings'
export async function fetchSingleCourse(courseId: string) {
	const supabase = await createClient()

	const { data: course, error } = await supabase
		.from('course')
		.select(
			`
      *,
      reviews(*),
      categories(*),
      profiles(*)
    `
		)
		.eq('id', courseId)
		.single()

	if (error) {
		console.error('Error fetching course:', error)

		return null
	}
	const updatedCourse = addRatingsToCourses(course)
	return updatedCourse
}
