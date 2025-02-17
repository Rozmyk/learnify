'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CategoryProps } from '@/types/api'
import { usePathname } from 'next/navigation'
import { Button } from '../button'
import Loading from './Loading/Loading'

const CategoryMenu = () => {
	const [categoriesData, setCategoriesData] = useState<null | CategoryProps[]>(null)
	const [loading, setLoading] = useState(true)
	const pathname = usePathname()

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

	if (pathname !== '/') {
		return null
	}

	return (
		<div className='w-full hidden lg:block'>
			<div className='h-12 w-full flex justify-center border-b border-b-foreground/10'>
				<div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
					{loading ? (
						<Loading />
					) : (
						categoriesData?.map(category => (
							<Button variant='ghost' key={category.id}>
								<Link className='hover:text-white' href={`courses/${category.slug}`}>
									{category.name}
								</Link>
							</Button>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default CategoryMenu
