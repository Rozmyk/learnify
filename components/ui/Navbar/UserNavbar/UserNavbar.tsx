import { Button } from '../../button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import ActionMenu from '../ActionMenu/ActionMenu'
import { ProfileDataProps } from '@/types/api'
import HomeButton from '../HomeButton/HomeButton'
import CartButton from '../CartButton/CartButton'
import FavCoursesButton from '../FavCoursesButton/FavCoursesButton'
import Link from 'next/link'
import NavbarSearch from '../NavbarSearch/NavbarSearch'
import MyCoursesButton from '../MyCoursesButton/MyCoursesButton'
export default async function UserNavbar({ user }: { user: ProfileDataProps }) {
	return (
		<div className='flex justify-between items-center  gap-4 w-full'>
			<HomeButton />
			<NavbarSearch />
			<div className='flex items-center'>
				{user.isTeacher && (
					<Link href={'/instructor/courses'}>
						<Button variant='ghost'>Instructors</Button>
					</Link>
				)}
				<MyCoursesButton />
				<ThemeSwitcher />
				<FavCoursesButton userId={user.id} />
				<CartButton />
				<ActionMenu avatarUrl={user.avatar_url} username={user.username} email={user.email} />
			</div>
		</div>
	)
}
