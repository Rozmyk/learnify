import AddCourse from '@/components/AddCourse/AddCourse'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
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
	return <AddCourse />
}
