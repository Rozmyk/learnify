'use client'
import { useState, useEffect } from 'react'
import { CategoryProps, CourseProps } from '@/types/api'
import Loader from '@/components/ui/loader'
import { Button } from '@/components/ui/button'
import CoursesCarousel from '@/components/CoursesCarousel/CoursesCarousel'
const SingleBadge = ({ title, selected, onClick }: { title: string; selected: boolean; onClick: () => void }) => {
	return (
		<div
			onClick={onClick}
			className={`cursor-pointer border border-border ${selected ? 'text-secondary' : 'text-primary'} ${selected ? 'bg-primary' : 'bg-secondary'} rounded-full py-2 px-4`}>
			<p className='font-semibold text-sm'>{title}</p>
			<p className='text-xs text-muted-foreground'>124 courses</p>
		</div>
	)
}
const ChooseCourse = () => {
	const [selectedCategoryId, setSelectedCategoryId] = useState<null | string>(null)
	const [categoriesData, setCategoriesData] = useState<null | CategoryProps[]>(null)
	const [coursesLoading, setCoursesLoading] = useState(true)
	const [coursesData, setCoursesData] = useState<CourseProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await fetch('/api/categories')

				if (!response.ok) {
					throw new Error('Failed to fetch categories')
				}

				const data = await response.json()
				setSelectedCategoryId(data[0].id)
				setCategoriesData(data)
				setLoading(false)
			} catch (error) {
				console.error('Error during category download:', error)
			}
		}

		getCategories()
	}, [])
	useEffect(() => {
		const fetchCoursesByCategory = async () => {
			try {
				setCoursesLoading(true)
				const response = await fetch(`/api/courses?category=${selectedCategoryId}`)
				const data = await response.json()

				setCoursesData(data)
				setCoursesLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		if (selectedCategoryId) {
			fetchCoursesByCategory()
		}
	}, [selectedCategoryId])
	return loading ? (
		<div className='flex justify-center items-center w-full'>
			<Loader />
		</div>
	) : (
		<div>
			<div className='flex  justify-start items-center gap-4 mb-8'>
				{categoriesData?.map(item => {
					return (
						<SingleBadge
							onClick={() => {
								setSelectedCategoryId(item.id)
							}}
							selected={selectedCategoryId == item.id}
							key={item.id}
							title={item.name}
						/>
					)
				})}
			</div>

			{coursesData && coursesData.length > 0 && (
				<CoursesCarousel loading={coursesLoading} courses={coursesData} text='' />
			)}

			<Button className='mt-4'>Show more course</Button>
			<h3>Zaufało nam ponad 16 000 firm i miliony użytkowników z całego świata</h3>
		</div>
	)
}

export default ChooseCourse
