import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { PromocodeProps } from '@/types/api'
import { useCartStore } from '@/context/cart'
import { X } from 'lucide-react'
const Promotions = () => {
	const { applyPromoCode, promoCode, deletePromoCode } = useCartStore()
	const [loading, setLoading] = useState(false)
	const [promocodeData, setPromocodeData] = useState<PromocodeProps | null>(null)
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState('')
	const checkPromocode = async (code: string) => {
		try {
			setLoading(true)
			setError('')

			const response = await fetch('/api/cart/apply-promocode', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ promoCode: code }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || `Error ${response.status}`)
			}

			setInputValue('')
			console.log(data)
			setPromocodeData(data.appliedPromoCode)
		} catch (error) {
			setPromocodeData(null)
			setError(error instanceof Error ? error.message : 'Unexpected error occurred')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		setError('')
	}, [inputValue])

	return (
		<div>
			<p className='font-semibold mb-2 '>Promotions</p>
			{promoCode && (
				<div className='p-2 border border-dashed border-border my-4 flex justify-between items-center'>
					<p className='text-muted-foreground text-sm'>
						Used: <span className='font-semibold uppercase '>{promoCode}</span>
					</p>
					<Button
						onClick={() => {
							deletePromoCode(promoCode)
						}}
						size='icon'
						variant='ghost'
						className='text-muted-foreground'>
						<X size={16} />
					</Button>
				</div>
			)}
			<div className='flex justify-between items-center gap-2 mb-4 '>
				<Input
					value={inputValue}
					onChange={e => {
						setInputValue(e.target.value)
					}}
					placeholder='Enter voucher'
				/>

				<Button
					disabled={inputValue.trim() == ''}
					onClick={() => {
						applyPromoCode(inputValue)
					}}>
					{loading ? 'Loading...' : 'Apply'}
				</Button>
			</div>
			{error && <p className='text-red-400 text-sm'>{error}</p>}
		</div>
	)
}

export default Promotions
