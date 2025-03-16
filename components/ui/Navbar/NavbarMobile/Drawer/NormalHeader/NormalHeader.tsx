import { Button } from '@/components/ui/button'
import Link from 'next/link'
const NormalHeader = ({ handleCloseDrawer }: { handleCloseDrawer: () => void }) => {
	return (
		<div className='flex flex-col gap-2 mb-4 '>
			<span onClick={handleCloseDrawer}>
				<Link className='w-full' href={'/sign-in'}>
					<Button className='w-full' variant='outline'>
						Login
					</Button>
				</Link>
			</span>
			<span onClick={handleCloseDrawer}>
				<Link className='w-full' href='/sign-up'>
					<Button className='w-full' variant='outline'>
						Register
					</Button>
				</Link>
			</span>
		</div>
	)
}

export default NormalHeader
