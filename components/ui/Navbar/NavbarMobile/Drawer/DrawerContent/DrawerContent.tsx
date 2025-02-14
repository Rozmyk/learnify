'use client'
import { useState, useEffect } from 'react'
import { CategoryProps } from '@/types/api'
import MostPopular from './MostPopular/MostPopular'
import Explore from './Explore/Explore'
import OtherServices from './OtherServices/OtherServices'
import Loader from '@/components/ui/loader'

const DrawerContent = () => {
	const [categoriesData, setCategoriesData] = useState<null | CategoryProps[]>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await fetch('/api/categories')

				if (!response.ok) {
					throw new Error('Failed to fetch categories')
				}

				const data = await response.json()
				setCategoriesData(data)
				setLoading(false)
			} catch (error) {
				console.error('Error during category download:', error)
			}
		}

		getCategories()
	}, [])
	return (
		<div>
			{loading ? (
				<div className='flex justify-center items-center w-full pt-4'>
					<Loader />
				</div>
			) : (
				<>
					<Explore />
					<MostPopular categoriesData={categoriesData} />
					<OtherServices />
				</>
			)}
		</div>
	)
}

export default DrawerContent
