import { useEffect } from 'react'
import { CurrenciesProps, PriceProps } from '@/types/api'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { Label } from '@/components/ui/label'

interface PriceLevelSelectProps {
	value: string
	onChange: (value: string) => void
	currency: string | undefined
	rates: Record<string, number>
	currencies: CurrenciesProps[] | null
	prices: PriceProps[] | null
}

const PriceLevelSelect = ({ value, onChange, currency, rates, currencies, prices }: PriceLevelSelectProps) => {
	const currentCurrency = currencies?.find(item => item.id === currency) ?? { name: 'USD' }
	const conversionRate = rates?.[currentCurrency.name] ?? 1

	const priceOptions =
		prices?.map(item => ({
			label: `${(item.value * item.level * conversionRate).toFixed(2)} ${currentCurrency.name} (Level ${item.level})`,
			value: item.id,
		})) ?? []

	useEffect(() => {
		const exists = priceOptions.some(option => option.value === value)
		if (!value || !exists) {
			if (priceOptions.length > 0) {
				onChange(priceOptions[0].value)
			}
		}
	}, [value, priceOptions, onChange])

	return (
		<div className='flex flex-col gap-2'>
			<Label className='font-semibold my-1 text-base'>Price level</Label>
			<CustomSelect
				loading={false}
				value={value}
				onChange={onChange}
				placeholder='Choose price level'
				options={priceOptions}
			/>
		</div>
	)
}

export default PriceLevelSelect
