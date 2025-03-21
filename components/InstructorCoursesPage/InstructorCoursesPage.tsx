'use client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import SingleInstructorCourse from './SingleInstructorCourse/SingleInstructorCourse'
import Loader from '../ui/loader'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CourseProps } from '@/types/api'
import InstructorDrawer from './InstrcutorDrawer/InstructorDrawer'
const InstructorCoursesPage = ({ userId }: { userId: string }) => {
	const [courses, setCourses] = useState<CourseProps[] | null>(null)
	const [inputValue, setInputValue] = useState('')
	const [searchedTitle, setSearchedTitle] = useState('')

	const [loading, setLoading] = useState(true)

	const fetchCourses = async () => {
		try {
			setLoading(true)
			if (inputValue.trim() !== '') {
				setSearchedTitle(inputValue)
			}
			const response = await fetch(`/api/courses?author_id=${userId}&title=${inputValue.trim()}`)

			if (!response.ok) {
				throw new Error('Failed to fetch  courses')
			}
			const data = await response.json()

			setCourses(data)
			setLoading(false)
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		fetchCourses()
	}, [userId])
	useEffect(() => {
		if (inputValue.trim() === '') {
			fetchCourses()
		}
	}, [inputValue])

	return (
		<>
			<InstructorDrawer />
			<div className='p-4'>
				<h1 className='text-4xl font-semibold py-8'>Courses</h1>
				<div className='flex justify-between items-center w-full'>
					<div className='flex justify-start items-center gap-4'>
						<div className='flex justify-start items-start gap-4 '>
							<Input
								value={inputValue}
								onChange={e => {
									setInputValue(e.target.value)
								}}
								placeholder='Search for your courses'
							/>
							<div>
								<Button size='icon' disabled={inputValue.trim() == ''} onClick={fetchCourses}>
									<Search size={16} />
								</Button>
							</div>
						</div>
					</div>
					<Link href='/course/create/1'>
						<Button>New course</Button>
					</Link>
				</div>

				{loading ? (
					<div className='flex justify-center items-center py-8 w-full '>
						<Loader />
					</div>
				) : (
					<div className='flex flex-col gap-4 mt-8'>
						{courses && courses?.length > 0 ? (
							courses?.map(course => {
								return <SingleInstructorCourse key={course.id} {...course} />
							})
						) : (
							<p className='font-semibold'>No results for the query {searchedTitle}</p>
						)}
					</div>
				)}
			</div>
		</>
	)
}

export default InstructorCoursesPage
