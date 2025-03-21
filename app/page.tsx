import { createClient } from '@/utils/supabase/server'
import { ProfileDataProps } from '@/types/api'
import ProtectedHomePage from '@/components/ProtectedHomePage/ProtectedHomePage'
import PublicHomePage from '@/components/PublicHomePage/PublicHomePage'
import PageContainer from '@/components/PageContainer/PageContainer'
import PromocodeBanner from '@/components/PromocodeBanner/PromocodeBanner'
import CategoryMenu from '@/components/ui/CategoryMenu/CategoryMenu'
import Navbar from '@/components/ui/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
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
		<div>
			<PromocodeBanner />
			<Navbar />
			<CategoryMenu />
			<PageContainer>
				<main className='flex-1 flex flex-col gap-6 h-screen p-4'>
					{profileData ? <ProtectedHomePage profileData={profileData} /> : <PublicHomePage />}
				</main>
			</PageContainer>
			<Footer />
		</div>
	)
}
