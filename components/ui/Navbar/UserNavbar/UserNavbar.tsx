import { Button } from '../../button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'

export default async function UserNavbar({ userId }: { userId: string }) {
	const supabase = await createClient()
	const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

	if (error) {
		console.error('Error fetching profile:', error)
	}
	return (
		<div className='flex items-center gap-4'>
			<Button variant={'ghost'}>My training</Button>
			<ThemeSwitcher />
			<Button variant={'ghost'}>
				<Image height={30} width={30} src={profile?.avatar_url} alt='User avatar' className='rounded-full' />
			</Button>
		</div>
	)
}
