import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PageContainer from '@/components/PageContainer/PageContainer'
import InstructorCoursesPage from '@/components/InstructorCoursesPage/InstructorCoursesPage'
export default async function page() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}

	return (
		<PageContainer>
			<InstructorCoursesPage userId={user.id} />
		</PageContainer>
	)
}
