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
			className={`cursor-pointer border border-border ${selected ? 'text-secondary' : 'text-primary'} ${
				selected ? 'bg-primary' : 'bg-secondary'
			} rounded-full py-2 px-4 w-fit`}>
			<p className='font-semibold text-sm whitespace-nowrap'>{title}</p>
			<p className='text-xs text-muted-foreground whitespace-nowrap'>124 courses</p>
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
			<div className='flex  justify-start items-center gap-4 mb-8 overflow-auto py-4 '>
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

			{coursesData && coursesData.length > 0 ? (
				<CoursesCarousel loading={coursesLoading} courses={coursesData} text='' />
			) : (
				<div className='flex justify-center items-center my-4'>
					<p className='text-muted-foreground'>No found courses for this category</p>
				</div>
			)}
			{coursesData && coursesData.length > 0 && <Button className='mt-4'>Show more course</Button>}
		</div>
	)
}

export default ChooseCourse
