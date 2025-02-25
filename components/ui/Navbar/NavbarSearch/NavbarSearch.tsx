'use client'

import { Input } from '../../input'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CourseProps } from '@/types/api'
import Image from 'next/image'
const SingleSearchCourse = ({ course }: { course: CourseProps }) => {
	return (
		<div className='flex justify-start items-start gap-4 mb-4'>
			<div className='w-10 h-10 relative'>
				<Image src={course.thumbnail} alt='course image' className='object-cover' fill />
			</div>
			<div className='flex flex-col'>
				<h3 className='font-semibold '>{course.title}</h3>
				<div className='flex justify-start items-center gap-2 '>
					<p className='font-semibold text-sm text-muted-foreground'>Course:</p>
					<p className='text-sm text-muted-foreground'>{course.profiles.username}</p>
				</div>
			</div>
		</div>
	)
}

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
				onBlur={() => {
					setInputFocused(false)
				}}
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				type='text'
				placeholder='Search for any courses...'
				className='w-full rounded-xl'
			/>
			{inputValue.trim().length >= 3 && courses.length > 0 && inputFocused && (
				<div className='w-full absolute top-full left-0 bg-secondary border border-border shadow-lg p-2 mt-2 rounded-md'>
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
