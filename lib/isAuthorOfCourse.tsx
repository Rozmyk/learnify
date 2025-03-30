import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const idSchema = z.string().uuid()

async function isAuthorOfCourse(courseId: string): Promise<boolean> {
	if (!idSchema.safeParse(courseId).success) {
		console.error('Invalid course ID:', courseId)
		return false
	}

	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (authError || !user) {
		console.error('Authentication error:', authError)
		return false
	}

	const { data, error } = await supabase
		.from('course')
		.select('id')
		.eq('id', courseId)
		.eq('author_id', user.id)
		.limit(1)

	if (error) {
		console.error('Error fetching course data:', error)
		return false
	}

	return !!data
}

export default isAuthorOfCourse
