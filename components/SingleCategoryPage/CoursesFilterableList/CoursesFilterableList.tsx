'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import CoursesSelect from './CoursesSelect/CoursesSelect'
import FilterAccordion from './FilterAccordion/FilterAccordion'
import Loader from '@/components/ui/loader'
import WideCourseCard from '@/components/WideCourseCard/WideCourseCard'

const CoursesFilterableList = () => {
	const [fullWidth, setFullWidth] = useState(true)
	const [loading, setLoading] = useState(false)
	const [sortBy, setSortBy] = useState(null)
	const [free, setFree] = useState(false)
	const [payable, setPayable] = useState(false)

	return (
		<>
			<div className='flex w-full justify-between items-center'>
				<div className='flex justify-start items-center gap-4 my-8'>
					<Button
						onClick={() => {
							setFullWidth(!fullWidth)
						}}>
						FIltruj
					</Button>
					<CoursesSelect />
					<Button variant='ghost'>Clean filters</Button>
				</div>
				<p className='font-semibold'>1000 results</p>
			</div>
			<div className='flex justify-between items-start gap-8 mb-96'>
				<div
					className={`overflow-hidden transition-all duration-500 ${
						fullWidth ? 'w-full md:w-1/4 opacity-100' : 'max-w-0 opacity-0'
					}`}>
					<FilterAccordion />
				</div>
				<div className={`transition-all  duration-500 ${!fullWidth ? 'w-full' : 'md:w-3/4'}`}>
					{loading ? (
						<div className='flex justify-center items-center p-8'>
							<Loader />
						</div>
					) : (
						<div className='flex flex-col gap-4'>items</div>
					)}
				</div>
			</div>
		</>
	)
}

export default CoursesFilterableList
