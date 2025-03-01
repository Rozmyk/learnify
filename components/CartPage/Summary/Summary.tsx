import { Button } from '@/components/ui/button'
import Promotions from '../Promotions/Promotions'
import { useCartStore } from '@/context/cart'

const Summary = ({ totalPrice, handleBuyCourses }: { totalPrice: number; handleBuyCourses: () => void }) => {
	const { discount, originalTotal } = useCartStore()
	const hasDiscount = discount !== 0 && originalTotal !== 0

	return (
		<>
			<p className='text-muted-foreground text-lg font-semibold'>Summary:</p>
			<p className='text-3xl font-semibold mb-2'>{totalPrice} zł</p>
			{hasDiscount && (
				<>
					<p className='text-muted-foreground line-through text-nowrap'>{originalTotal} zł</p>
					<p className='text-muted-foreground mb-2 text-nowrap'>{discount}% discount</p>
				</>
			)}
			<Button onClick={handleBuyCourses} className='w-full mb-2'>
				Go to checkout
			</Button>
			<p className='text-muted-foreground text-sm'>You won't pay anything yet</p>
			<div className='border-b border-border my-4'></div>
			<Promotions />
		</>
	)
}

export default Summary
