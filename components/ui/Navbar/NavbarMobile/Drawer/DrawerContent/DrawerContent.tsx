'use client'
import { useState, useEffect } from 'react'
import { CategoryProps } from '@/types/api'
import MostPopular from './MostPopular/MostPopular'
import Explore from './Explore/Explore'
import OtherServices from './OtherServices/OtherServices'
const DrawerContent = () => {
	const [categoriesData, setCategoriesData] = useState<null | CategoryProps[]>(null)
	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await fetch('/api/categories')

				if (!response.ok) {
					throw new Error('Failed to fetch categories')
				}

				const data = await response.json()
				setCategoriesData(data)
			} catch (error) {
				console.error('Error during category download:', error)
			}
		}

		getCategories()
	}, [])
	return (
		<div>
			<Explore />
			<MostPopular categoriesData={categoriesData} />
			<OtherServices />
		</div>
	)
}

export default DrawerContent
