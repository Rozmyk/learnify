import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
const Promotions = () => {
	return (
		<div>
			<p className='font-semibold '>Promotions</p>
			<div className='p-2 border border-dashed border-border'></div>
			<div className='flex justify-between items-center gap-2 '>
				<Input placeholder='Enter voucher' /> <Button>Apply</Button>
			</div>
		</div>
	)
}

export default Promotions
