'use client'

import { Input } from '../../input'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CourseProps } from '@/types/api'
import SingleSearchCourse from '@/components/SingleSearchCourse/SingleSearchCourse'

const NavbarSearch = () => {
	const [inputValue, setInputValue] = useState('')
	const [courses, setCourses] = useState([])
	const [inputFocused, setInputFocused] = useState(false)

	useEffect(() => {
		const fetchCourses = async () => {
			if (inputValue.trim().length < 2) {
				setCourses([])
				return
			}

			const res = await fetch(`/api/course/search?q=${inputValue}`)
			const data = await res.json()
			setCourses(data.courses)
		}

		const debounce = setTimeout(fetchCourses, 300)

		return () => clearTimeout(debounce)
	}, [inputValue])

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
			{inputValue.trim().length >= 3 && courses.length > 0 && inputFocused && (
				<div className='w-full absolute top-full left-0 bg-secondary border border-border shadow-lg p-2 mt-2 rounded-md z-30'>
					<ul>
						{courses.map((course: CourseProps) => (
							<Link
								key={course.id}
								href={`/course/${course.slug}`}
								onClick={() => {
									setInputValue('')
								}}>
								<SingleSearchCourse course={course} />
							</Link>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default NavbarSearch
