import { Button } from '../../button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { createClient } from '@/utils/supabase/server'
import ActionMenu from '../ActionMenu/ActionMenu'
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
			<ActionMenu avatarUrl={profile.avatar_url} username={profile.username} email={profile.email} />
		</div>
	)
}
