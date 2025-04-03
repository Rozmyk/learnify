'use client'
import { useEffect, useState } from 'react'
import PageWrapper from '../../PageWrapper/PageWrapper'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import Loader from '@/components/ui/loader'
import PriceLevelSelect from './PriceLevelSelect/PriceLevelSelect'
import CurrencySelect from './CurrencySelect/CurrencySelect'
import { PriceProps, CurrenciesProps } from '@/types/api'
const FREE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'

const PricingPage = () => {
	const { temporaryData, setTemporaryData } = useCreateCourseStore()
	const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ USD: 1 })
	const [prices, setPrices] = useState<PriceProps[] | null>(null)
	const [currencies, setCurrencies] = useState<CurrenciesProps[] | null>(null)
	const [globalLoading, setGlobalLoading] = useState({ price: true, currency: true, rates: true })

	useEffect(() => {
		const fetchData = async () => {
			const fetchExchangeRates = async () => {
				try {
					const response = await fetch(FREE_API_URL)
					if (!response.ok) throw new Error('Exchange rate fetch failed')
					const data = await response.json()
					setExchangeRates(data.rates)
				} catch (error) {
					console.error('Error fetching exchange rates:', error)
				} finally {
					setGlobalLoading(prev => ({ ...prev, rates: false }))
				}
			}

			const fetchPrices = async () => {
				try {
					const response = await fetch('/api/prices')
					if (!response.ok) throw new Error('Network response was not ok')
					const data = await response.json()
					setPrices(data.prices)
				} catch (error) {
					console.error('Error fetching prices:', error)
				} finally {
					setGlobalLoading(prev => ({ ...prev, price: false }))
				}
			}

			const fetchCurrencies = async () => {
				try {
					const response = await fetch('/api/currencies')
					if (!response.ok) throw new Error('Network response was not ok')
					const data = await response.json()
					setCurrencies(data.currencies)
				} catch (error) {
					console.error('Error fetching currencies:', error)
				} finally {
					setGlobalLoading(prev => ({ ...prev, currency: false }))
				}
			}

			await Promise.all([fetchCurrencies(), fetchPrices(), fetchExchangeRates()])
		}

		fetchData()
	}, [])

	return (
		<PageWrapper title='Pricing'>
			<h3 className='font-semibold my-1'>Set the price of your course</h3>
			<p className='text-muted-foreground'>
				Choose the currency and price level for your course. If you want to make the course available for free, its
				length must not exceed 2 hours. In addition, courses with practice tests cannot be free.
			</p>
			{globalLoading.currency || globalLoading.price ? (
				<div className='flex w-full py-10 justify-center items-center'>
					<Loader />
				</div>
			) : (
				<div className='flex my-10 gap-4'>
					<CurrencySelect
						currencies={currencies}
						value={temporaryData.currencies_id ?? ''}
						onChange={e => setTemporaryData({ ...temporaryData, currencies_id: e })}
					/>
					<PriceLevelSelect
						currencies={currencies}
						prices={prices}
						value={temporaryData.price_id ?? ''}
						onChange={e => setTemporaryData({ ...temporaryData, price_id: e })}
						currency={temporaryData.currencies_id}
						rates={exchangeRates}
					/>
				</div>
			)}
		</PageWrapper>
	)
}

export default PricingPage
