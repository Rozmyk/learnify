import { createClient } from '@/utils/supabase/server'
import UserNavbar from './UserNavbar/UserNavbar'
import PublicNavbar from './PublicNavbar/PublicNavbar'
import NavbarMobile from './NavbarMobile/NavbarMobile'

export default async function Navbar() {
	const supabase = await createClient()
	let userData
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (user) {
		const { data: fetchedUserData, error: fetchedUserDataError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', user.id)
			.single()
		userData = fetchedUserData
		if (fetchedUserDataError) {
			console.log(fetchedUserDataError)
		}
	}

	return (
		<nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
			<div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
				<div className='hidden lg:flex gap-5 w-full'>{user ? <UserNavbar user={userData} /> : <PublicNavbar />}</div>

				<div className='lg:hidden w-full'>
					<NavbarMobile user={userData} />
				</div>
			</div>
		</nav>
	)
}
