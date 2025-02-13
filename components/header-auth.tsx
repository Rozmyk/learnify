import { signOutAction } from '@/app/actions'
import Link from 'next/link'
import { Button } from './ui/button'
import { createClient } from '@/utils/supabase/server'
import { ThemeSwitcher } from './theme-switcher'
import Image from 'next/image'

export default async function AuthButton() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return (
			<div className='flex gap-2'>
				<Button asChild size='sm' variant={'default'}>
					<Link href='/sign-up'>Sign up</Link>
				</Button>
				<ThemeSwitcher />
			</div>
		)
	}

	const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

	if (error) {
		console.error('Error fetching profile:', error)
	}

	return (
		<div className='flex items-center gap-4'>
			<ThemeSwitcher />
			<Image height={30} width={30} src={profile?.avatar_url} alt='User avatar' className='rounded-full' />

			<form action={signOutAction}>
				<Button type='submit' variant={'outline'}>
					Sign out
				</Button>
			</form>
		</div>
	)
}
