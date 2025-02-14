import { Button } from '../../button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import ActionMenu from '../ActionMenu/ActionMenu'
import { ProfileDataProps } from '@/types/api'
export default async function UserNavbar({ user }: { user: ProfileDataProps }) {
	return (
		<div className='flex items-center gap-4'>
			<Button variant={'ghost'}>My training</Button>
			<ThemeSwitcher />
			<ActionMenu avatarUrl={user.avatar_url} username={user.username} email={user.email} />
		</div>
	)
}
