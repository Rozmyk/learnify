'use client'
import { ReactNode, useEffect, useState } from 'react'
import ManageSidebar from '../ManageSidebar/ManageSidebar'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import Loader from '@/components/ui/loader'
const CourseProvider = ({ children, courseId }: { children: ReactNode; courseId: string }) => {
	const { loading, loadCourse } = useCreateCourseStore()
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		const fetchData = async () => {
			if (courseId) {
				await loadCourse(courseId)
				setIsLoaded(true)
			}
		}
		fetchData()
	}, [courseId, loadCourse])
	return (
		<>
			{loading || !isLoaded ? (
				<div className='flex justify-center items-center w-full '>
					<Loader />
				</div>
			) : (
				<>
					<div className='md:w-1/4 w-full '>
						<ManageSidebar />
					</div>
					<div className='md:w-3/4 w-full'>{children}</div>
				</>
			)}
		</>
	)
}

export default CourseProvider
