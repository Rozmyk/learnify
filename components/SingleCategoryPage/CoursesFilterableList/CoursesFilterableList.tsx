'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import CoursesSelect from './CoursesSelect/CoursesSelect'
import FilterAccordion from './FilterAccordion/FilterAccordion'
import Loader from '@/components/ui/loader'
import { CategoryProps, CourseProps } from '@/types/api'
import { useSearchParams, useRouter } from 'next/navigation'
import WideCourseCard from '@/components/WideCourseCard/WideCourseCard'

const CoursesFilterableList = ({ category }: { category: CategoryProps }) => {
	const [fullWidth, setFullWidth] = useState(true)
	const [loading, setLoading] = useState(true)
	const [filteredCourses, setFilteredCourses] = useState<CourseProps[]>([])
	const [filters, setFilters] = useState<Record<string, string>>({})
	const router = useRouter()
	const searchParams = useSearchParams()

	const fetchFilteredCourses = async (params: Record<string, string>) => {
		setLoading(true)
		params.category = category.id
		const paramsToSend = new URLSearchParams(params).toString()
		const response = await fetch(`/api/courses?${paramsToSend}`)
		const data = await response.json()
		console.log(data)
		setFilteredCourses(data)
		setLoading(false)
	}

	const handleFilter = (paramsToUpdate: Record<string, string>) => {
		const params = new URLSearchParams(searchParams.toString())

		Object.entries(paramsToUpdate).forEach(([key, value]) => {
			params.set(key, value)
		})

		router.push(`?${params.toString()}`, { scroll: false })
		setLoading(true)
	}

	const handleCleanFilter = () => {
		const params = new URLSearchParams()
		router.push(`?${params.toString()}`, { scroll: false })
	}

	useEffect(() => {
		const params: Record<string, string> = {}
		searchParams.forEach((value, key) => {
			params[key] = value
		})
		setFilters(params)

		if (Object.keys(params).length === 0) {
			fetchFilteredCourses({})
		} else {
			fetchFilteredCourses(params)
		}
	}, [searchParams])

	return (
		<>
			<div className='flex w-full justify-between items-center'>
				<div className='flex justify-start items-center gap-4 my-8'>
					<Button
						onClick={() => {
							setFullWidth(!fullWidth)
						}}>
						Filters
					</Button>
					<CoursesSelect filters={filters} handleFilter={handleFilter} />
					<Button onClick={handleCleanFilter} variant='ghost'>
						Clean filters
					</Button>
				</div>
				<p className='font-semibold'>{filteredCourses?.length ?? 0} results</p>
			</div>
			<div className='flex md:flex-row flex-col justify-between items-start gap-8 mb-96'>
				<div
					className={`overflow-hidden transition-all duration-500 ${
						fullWidth ? 'w-full md:w-1/4 opacity-100' : 'max-w-0 opacity-0'
					}`}>
					<FilterAccordion filters={filters} handleFilter={handleFilter} />
				</div>
				<div className={`transition-all duration-500 ${!fullWidth ? 'w-full' : 'md:w-3/4'}`}>
					{loading ? (
						<div className='flex justify-center w-full items-center p-8'>
							<Loader />
						</div>
					) : (
						<div className='flex flex-col gap-4'>
							{filteredCourses.length > 0 ? (
								filteredCourses.map(course => <WideCourseCard key={course.id} {...course} />)
							) : (
								<div className='flex justify-center items-center'>
									<p>No courses found</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default CoursesFilterableList
