import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
export default async function Home() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/sign-in')
	}
	return (
		<>
			<main className='flex-1 flex flex-col gap-6 h-screen px-4'>main page</main>
		</>
	)
}
