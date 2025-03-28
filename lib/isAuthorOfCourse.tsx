import { createClient } from '@/utils/supabase/server'

async function isAuthorOfCourse(courseId: string): Promise<boolean> {
	try {
		const supabase = await createClient()

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser()

		if (authError || !user) {
			console.error('Błąd uwierzytelniania:', authError)
			return false
		}

		const { data: course, error: courseError } = await supabase
			.from('course')
			.select('id')
			.eq('id', courseId)
			.eq('author_id', user.id)
			.single()

		if (courseError) {
			console.error('Błąd pobierania kursu:', courseError)
			return false
		}

		return !!course
	} catch (error) {
		console.error('Nieoczekiwany błąd:', error)
		return false
	}
}
export default isAuthorOfCourse
