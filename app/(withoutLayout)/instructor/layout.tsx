import InstructorDrawer from '@/components/InstructorPage/InstructorCoursesPage/InstrcutorDrawer/InstructorDrawer'
import InstructorNavbar from '@/components/InstructorPage/InstructorCoursesPage/InstructorNavbar/InstructorNavbar'
import PageContainer from '@/components/PageContainer/PageContainer'
import Footer from '@/components/Footer/Footer'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
export default async function Layout({ children }: { children: React.ReactNode }) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}
	return (
		<>
			<InstructorNavbar userId={user.id} />
			<InstructorDrawer />
			<PageContainer>{children}</PageContainer>
			<Footer />
		</>
	)
}
