import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import MyCoursesPage from '@/components/MyCoursesPage/MyCoursesPage'
export default async function MyCourses() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}
	const { data, error } = await supabase
		.from('course')
		.select(
			`
              *,
              reviews(*, profiles(*)),
              categories(*),
              profiles(*)
             
            `
		)
		.eq('author_id', user.id)
	if (error) {
		console.log(error.message)
	}

	return
}
