'use client'
import { CourseProps } from '@/types/api'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProgressComponent from '../ProgressComponent/ProgressComponent'
import SimpleStarRating from '../SimpleStarRating/SimpleStarRating'
import { CirclePlay } from 'lucide-react'

const SinglePurchasedCourse = ({ title, profiles, thumbnail, slug, user_lessons_progress, lessons }: CourseProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const courseProgress = user_lessons_progress.length > 0 ? (user_lessons_progress.length / lessons.length) * 100 : 0
	return (
		<Link href={`/course/${slug}/learn`}>
			<div className='w-80 max-w-80 mix-w-80  p-2'>
				<div
					onMouseEnter={() => {
						setIsHovered(true)
					}}
					onMouseLeave={() => {
						setIsHovered(false)
					}}
					className='relative w-full h-40 border border-border'>
					{isHovered && (
						<div className='absolute opacity-70 bg-black top-0 left-0 right-0 bottom-0 w-full h-full z-50 flex justify-center items-center'>
							<div className='opacity-100'>
								{' '}
								<CirclePlay size={50} />
							</div>
						</div>
					)}
					<Image fill src={thumbnail} alt='course image' />
				</div>
				<h3 className='line-clamp-2 font-semibold mt-2 h-[3rem] leading-snug'>{title}</h3>

				<p className='capitalize text-muted-foreground text-sm mb-6'>{profiles.username}</p>
				<ProgressComponent value={courseProgress} />
				<div className='flex justify-between items-center py-2'>
					<p className='text-xs text-muted-foreground'>Completed {courseProgress.toFixed(1)}%</p>
					<div className='flex flex-col gap-.05'>
						<SimpleStarRating stars={4} />
						<p className='text-xs text-muted-foreground'>Your review</p>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default SinglePurchasedCourse
