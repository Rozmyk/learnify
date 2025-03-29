'use client'

import { useEffect, useState } from 'react'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import PageWrapper from '../../PageWrapper/PageWrapper'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'

const FREE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

const CurrencySelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const currencies = ['USD', 'EUR', 'GBP', 'PLN', 'MXN', 'JPY', 'CAD']
	const options = currencies.map(code => ({ label: code, value: code }))

	return (
		<div className='flex flex-col gap-2'>
			<Label className='font-semibold my-1 text-base'>Currency</Label>
			<CustomSelect value={value} onChange={onChange} placeholder='Choose currency' options={options} />
		</div>
	)
}

const PriceLevelSelect = ({
	value,
	onChange,
	currency,
	rates,
}: {
	value: string
	onChange: (value: string) => void
	currency: string
	rates: Record<string, number>
}) => {
	const basePriceUSD = 19.99
	const conversionRate = rates[currency] || 1

	const priceLevels = Array.from({ length: 10 }, (_, i) => {
		const price = ((basePriceUSD + i * 10) * conversionRate).toFixed(2)
		return { label: `${price} ${currency} (Level ${i + 1})`, value: price }
	})

	useEffect(() => {
		if (!value || !priceLevels.some(p => p.value === value)) {
			onChange(priceLevels[0].value)
		}
	}, [value, currency, rates])

	return (
		<div className='flex flex-col gap-2'>
			<Label className='font-semibold my-1 text-base'>Price level</Label>
			<CustomSelect value={value ?? ''} onChange={onChange} placeholder='Choose price level' options={priceLevels} />
		</div>
	)
}

const PricingPage = () => {
	const { temporaryData, setTemporaryData } = useCreateCourseStore()
	const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ USD: 1 })

	useEffect(() => {
		const fetchExchangeRates = async () => {
			try {
				const res = await fetch(FREE_API_URL)
				const data = await res.json()
				setExchangeRates(data.rates)
			} catch (error) {
				console.error('Error fetching exchange rates:', error)
			}
		}

		fetchExchangeRates()
	}, [])

	return (
		<PageWrapper title='Pricing'>
			<h3 className='font-semibold my-1'>Set the price of your course</h3>
			<p className='text-muted-foreground'>
				Choose the currency and price level for your course. If you want to make the course available for free, its
				length must not exceed 2 hours. In addition, courses with practice tests cannot be free.
			</p>
			<div className='flex my-10 gap-4'>
				<CurrencySelect
					value={temporaryData.currency ?? ''}
					onChange={e => setTemporaryData({ ...temporaryData, currency: e })}
				/>
				<PriceLevelSelect
					value={String(temporaryData.price) ?? ''}
					onChange={e => setTemporaryData({ ...temporaryData, price: e })}
					currency={temporaryData.currency ?? ''}
					rates={exchangeRates}
				/>
			</div>
			<Button>Save</Button>
		</PageWrapper>
	)
}

export default PricingPage
