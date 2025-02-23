import { Button } from '@/components/ui/button'
import Promotions from '../Promotions/Promotions'
const Summary = ({ totalPrice }: { totalPrice: number }) => {
	return (
		<>
			<p className='text-muted-foreground text-lg font-semibold'>Summary:</p>
			<p className='text-3xl font-semibold mb-2'>{totalPrice} zł</p>
			<Button className='w-full mb-2'>Go to checkout</Button>
			<p className='text-muted-foreground text-sm'>You won't pay anything yet</p>
			<div className='border-b border-border my-4'></div>
			<Promotions />
		</>
	)
}

export default Summary
