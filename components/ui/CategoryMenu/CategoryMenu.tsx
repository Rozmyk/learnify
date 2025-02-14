'use client'
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CategoryProps } from '@/types/api'
import { usePathname } from 'next/navigation'
const CategoryMenu = () => {
	const [categoriesData, setCategoriesData] = useState<null | CategoryProps[]>(null)
	const pathname = usePathname()

	useEffect(() => {
		const getCategory = async () => {
			const supabase = createClient()
			const { data: categories, error } = await supabase.from('categories').select('*')
			if (error) {
				console.error('Error during category download:', error.message)
			} else {
				setCategoriesData(categories)
			}
		}

		getCategory()
	}, [])
	if (pathname !== '/') {
		return null
	}
	return (
		<div className='w-full hidden lg:block'>
			<div className='h-12  w-full flex justify-center  border-b border-b-foreground/10 '>
				<div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
					{categoriesData?.map(category => {
						return (
							<Link className='hover:text-white' href={`courses/${category.slug}`} key={category.id}>
								{category.name}
							</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default CategoryMenu
