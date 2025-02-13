import { Button } from '../../button'
import Link from 'next/link'
import { ThemeSwitcher } from '@/components/theme-switcher'
const PublicNavbar = () => {
	return (
		<div className='flex gap-2'>
			<Button asChild size='sm' variant={'default'}>
				<Link href='/sign-up'>Sign up</Link>
			</Button>
			<ThemeSwitcher />
		</div>
	)
}

export default PublicNavbar
