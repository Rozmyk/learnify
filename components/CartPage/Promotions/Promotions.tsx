import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { PromocodeProps } from '@/types/api'
import { X } from 'lucide-react'
const Promotions = () => {
	const [loading, setLoading] = useState(false)
	const [promocodeData, setPromocodeData] = useState<PromocodeProps | null>(null)
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState('')
	const checkPromocode = async (code: string) => {
		try {
			setLoading(true)
			setError('')

			const response = await fetch(`/api/check-promocode?code=${code}`)

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || `Błąd ${response.status}`)
			}

			const data = await response.json()
			setInputValue('')
			setPromocodeData(data)
		} catch (error) {
			setPromocodeData(null)
			setError(error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd')
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
			{promocodeData && (
				<div className='p-2 border border-dashed border-border my-4 flex justify-between items-center'>
					<p className='text-muted-foreground text-sm'>
						Used: <span className='font-semibold uppercase '>{promocodeData.value}</span>
					</p>
					<Button
						onClick={() => {
							setPromocodeData(null)
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
						checkPromocode(inputValue)
					}}>
					{loading ? 'Loading...' : 'Apply'}
				</Button>
			</div>
			{error && <p className='text-red-400 text-sm'>{error}</p>}
		</div>
	)
}

export default Promotions
