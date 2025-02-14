import { Button } from '@/components/ui/button'
import Link from 'next/link'
const NormalHeader = () => {
	return (
		<div className='flex flex-col gap-2 mb-4 '>
			<Button variant='outline'>
				<Link href={'/sign-in'}>Login</Link>
			</Button>
			<Button variant='outline'>
				<Link href='/sign-up'>Register</Link>
			</Button>
		</div>
	)
}

export default NormalHeader
