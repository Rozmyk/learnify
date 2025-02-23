import { Button } from '@/components/ui/button'
import Link from 'next/link'
const EmptyCart = () => {
	return (
		<div className='flex flex-col gap-4 justify-center items-center w-full h-96 border border-border rounded-lg '>
			<p className='text-lg font-semibold'>Your shopping cart is empty. Continue shopping and find a course.</p>
			<Link href={'/'}>
				<Button>Continue shopping</Button>
			</Link>
		</div>
	)
}

export default EmptyCart
