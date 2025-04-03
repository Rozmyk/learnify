import { createClient } from '@/utils/supabase/server'
export async function fetchCoursesByCategory(categoryId: string) {
	const supabase = await createClient()
	const { data: courses, error } = await supabase
		.from('course')
		.select(
			`
      *,
      reviews(*),
      categories!inner(*),
      profiles(*), currencies(*), prices(*),levels(*)
      `
		)
		.eq('categories.id', categoryId)

	if (error) {
		console.error('Error fetching courses by category:', error)
		return []
	}

	return courses
}
