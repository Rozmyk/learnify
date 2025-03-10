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

	return <MyCoursesPage />
}
