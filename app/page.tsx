import { createClient } from '@/utils/supabase/server'
import { ProfileDataProps } from '@/types/api'
import ProtectedHomePage from '@/components/ProtectedHomePage/ProtectedHomePage'
import PublicHomePage from '@/components/PublicHomePage/PublicHomePage'

export default async function Home() {
	const supabase = await createClient()
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser()

	if (userError) {
		console.error('Error fetching user:', userError)
	}

	let profileData: ProfileDataProps | null = null
	let profileError: Error | null = null

	if (user) {
		const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

		if (error) {
			profileError = error
			console.error('Error fetching profile data:', profileError)
		} else {
			profileData = data
			
		}
	}

	return (
		<>
			<main className='flex-1 flex flex-col gap-6 h-screen p-4'>
				{profileData ? <ProtectedHomePage profileData={profileData} /> : <PublicHomePage />}
			</main>
		</>
	)
}
