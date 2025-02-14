import { Button } from '../../button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import ActionMenu from '../ActionMenu/ActionMenu'
import { ProfileDataProps } from '@/types/api'
import HomeButton from '../HomeButton/HomeButton'
export default async function UserNavbar({ user }: { user: ProfileDataProps }) {
	return (
		<div className='flex justify-between items-center  gap-4 w-full'>
			<HomeButton />
			<div className='flex items-center'>
				<Button variant={'ghost'}>My training</Button>
				<ThemeSwitcher />
				<ActionMenu avatarUrl={user.avatar_url} username={user.username} email={user.email} />
			</div>
		</div>
	)
}
