import AddCourse from '@/components/AddCourse/AddCourse'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PageContainer from '@/components/PageContainer/PageContainer'
export default async function page() {
	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}
	if (authError) {
		console.log(authError)
	}
	return (
		<PageContainer>
			<AddCourse />
		</PageContainer>
	)
}
