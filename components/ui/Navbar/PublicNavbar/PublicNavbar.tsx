import { Button } from '../../button'
import Link from 'next/link'
import { ThemeSwitcher } from '@/components/theme-switcher'
import HomeButton from '../HomeButton/HomeButton'
const PublicNavbar = () => {
	return (
		<div className='flex justify-between items-center w-full'>
			<HomeButton />
			<div className='flex gap-2'>
				<Button asChild size='sm' variant='outline'>
					<Link href='/sign-in'>Sign in</Link>
				</Button>
				<Button asChild size='sm' variant={'default'}>
					<Link href='/sign-up'>Sign up</Link>
				</Button>
				<ThemeSwitcher />
			</div>
		</div>
	)
}

export default PublicNavbar
