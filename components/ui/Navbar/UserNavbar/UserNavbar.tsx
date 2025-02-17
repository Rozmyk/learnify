import { Button } from '../../button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import ActionMenu from '../ActionMenu/ActionMenu'
import { ProfileDataProps } from '@/types/api'
import HomeButton from '../HomeButton/HomeButton'
import Link from 'next/link'
export default async function UserNavbar({ user }: { user: ProfileDataProps }) {
	return (
		<div className='flex justify-between items-center  gap-4 w-full'>
			<HomeButton />
			<div className='flex items-center'>
				{user.isTeacher && (
					<Link href={'/add-course'}>
						<Button variant='ghost'>Add course</Button>
					</Link>
				)}
				<Link href='/course'>
					<Button variant={'ghost'}>My courses</Button>
				</Link>
				<ThemeSwitcher />
				<ActionMenu avatarUrl={user.avatar_url} username={user.username} email={user.email} />
			</div>
		</div>
	)
}
