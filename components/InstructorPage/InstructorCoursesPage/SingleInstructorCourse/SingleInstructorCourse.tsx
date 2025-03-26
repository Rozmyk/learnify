'use client'
import { useState } from 'react'
import { BookOpenText } from 'lucide-react'
import Link from 'next/link'
import { CourseProps } from '@/types/api'
import ProgressComponent from '@/components/ProgressComponent/ProgressComponent'
import Image from 'next/image'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'

const SingleInstructorCourse = ({ title, step_completed, status, thumbnail, id }: CourseProps) => {
	const { loadCourse } = useCreateCourseStore()
	const [isHovered, setIsHovered] = useState(false)
	const progressValue = step_completed * 25
	return (
		<div
			onClick={() => {
				loadCourse(id)
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='w-full flex justify-between items-start border border-border'>
			<div className='w-28 h-28 min-h-28 min-w-28 bg-primary flex justify-center items-center text-secondary relative'>
				{thumbnail ? (
					<Image className='object-cover' src={thumbnail} fill alt='course photo' />
				) : (
					<BookOpenText size={50} />
				)}
			</div>
			<div className='flex justify-start items-start w-full  flex-1  relative h-28 min-h-28  pl-2 md:pl-8'>
				{isHovered && (
					<Link href={`/instructor/course/${id}/manage`}>
						<div className='absolute w-full h-full bg-background/85 top-0 left-0 right-0 bottom-0 flex justify-center items-center cursor-pointer p-4 z-20'>
							<p className='text-lg md:text-xl font-semibold'>Edit or manage the course</p>
						</div>
					</Link>
				)}

				<div className='p-4 flex justify-between items-start gap-4 w-full h-full'>
					<div className='md:w-1/3 flex flex-col justify-between items-start h-full '>
						<p className='font-semibold line-clamp-2 capitalize text-sm'>{title}</p>
						{status === 'draft' && <p className='text-sm text-muted-foreground'>Working mode</p>}
					</div>
					<div className='hidden md:block md:w-2/3 relative z-0'>
						{status === 'draft' ? (
							<div className='flex w-full justify-start items-center gap-2 '>
								<p className='font-semibold text-nowrap text-sm'>Complete your course</p>
								<ProgressComponent className='h-1' value={progressValue} />
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SingleInstructorCourse
