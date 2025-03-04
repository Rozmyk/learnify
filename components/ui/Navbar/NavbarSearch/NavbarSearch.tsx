'use client'

import { Input } from '../../input'
import { useState } from 'react'
import Link from 'next/link'
import { CourseProps } from '@/types/api'
import SingleSearchCourse from '@/components/SingleSearchCourse/SingleSearchCourse'
import useDebouncedSearch from '@/lib/useDebouncedSearch'
import Loader from '../../loader'

const NavbarSearch = () => {
	const [inputValue, setInputValue] = useState('')
	const [inputFocused, setInputFocused] = useState(false)
	const { courses, loading } = useDebouncedSearch(inputValue)

	return (
		<div className='flex-1 relative'>
			<Input
				onFocus={() => {
					setInputFocused(true)
				}}
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				type='text'
				placeholder='Search for any courses...'
				className='w-full rounded-xl'
			/>
			{inputValue.trim().length >= 3 && courses && courses.length > 0 && inputFocused && (
				<div className='w-full absolute top-full left-0 bg-card border border-border shadow-lg p-2 mt-2 rounded-md z-30'>
					{loading ? (
						<div className='flex justify-center items-center py-8'>
							<Loader />
						</div>
					) : (
						courses?.map((course: CourseProps) => (
							<Link
								key={course.id}
								href={`/course/${course.slug}`}
								onClick={() => {
									setInputValue('')
								}}>
								<SingleSearchCourse course={course} />
							</Link>
						))
					)}
				</div>
			)}
		</div>
	)
}

export default NavbarSearch
