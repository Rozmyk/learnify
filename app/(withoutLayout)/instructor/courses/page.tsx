import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import InstructorCoursesPage from '@/components/InstructorPage/InstructorCoursesPage/InstructorCoursesPage'
export default async function page() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}

	return <InstructorCoursesPage userId={user.id} />
}
