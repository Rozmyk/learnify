'use client'
import { CourseProps } from '@/types/api'
import Image from 'next/image'
import StarRating from '@/components/ui/starRating'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import { useState, useEffect } from 'react'
import Skeleton from '@/components/ui/skeleton'
const PromotedCourse = () => {
	const [promotedData, setPromotedData] = useState<CourseProps | null>(null)
	const [loading, setLoading] = useState(true)
	const updateLastViewedCourse = async () => {
		if (promotedData && !loading) {
			try {
				await fetch('/api/updateLastViewed', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ courseId: promotedData.id }),
				})
			} catch (error) {
				console.error('Error updating last viewed course:', error)
			}
		}
	}
	useEffect(() => {
		const getPromotedCourse = async () => {
			try {
				const response = await fetch('/api/course/promoted')
				if (!response.ok) {
					throw new Error('Failed to fetch promoted course')
				}
				const data = await response.json()

				setPromotedData(data)

				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		getPromotedCourse()
	}, [])
	return (
		<>
			<SectionTitle>Our best recommendation for you</SectionTitle>
			{loading ? (
				<div className='flex justify-between items-start w-full gap-4 '>
					<Skeleton className='md:w-2/5 w-full h-52 md:h-80' />
					<div className='flex flex-col flex-1 gap-2 '>
						<Skeleton className='w-full h-16' />
						<Skeleton className='w-2/3 h-9' />
						<Skeleton className='w-1/4 h-4' />
					</div>
				</div>
			) : (
				promotedData && (
					<Link
						href={`/course/${promotedData.slug}`}
						onClick={updateLastViewedCourse}
						className=' relative w-full flex md:flex-row flex-col  justify-between items-start bg-card rounded-xl overflow-hidden  border border-border p-2 md:p-4 gap-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] cursor-pointer'>
						<div className='md:w-2/5 w-full  h-52 md:h-80  relative rounded-xl overflow-hidden '>
							<Image
								className='object-cover transition-transform duration-300 group-hover:scale-110'
								fill
								src={promotedData.thumbnail}
								alt={`${promotedData.title} course`}
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
							<div className='absolute bottom-4 left-4 right-4 flex items-center justify-between'>
								<span className='text-sm font-medium px-3 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm'>
									{promotedData.categories.name}
								</span>
							</div>
						</div>

						<div className=' w-full md:w-3/5 flex flex-col justify-between items-between h-80  	 '>
							<div className='flex flex-col justify-between items-start h-full'>
								<div>
									<h3 className='text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
										{promotedData.title}
									</h3>
									<p className='text-muted-foreground mb-4 line-clamp-2 flex-1'>{promotedData.description}</p>
									<p className='text-muted-foreground text-sm mb-4 line-clamp-2 flex-1'>
										Author: {promotedData.profiles.username}
									</p>
								</div>
								<div className='flex justify-between items-center w-full '>
									<StarRating reviews={promotedData.reviews} />
									<div className='flex justify-center items-center gap-2'>
										{promotedData.discount && promotedData.discount > 0 && (
											<p className='text-lg font-semibold '>
												{(promotedData.price * (1 - promotedData.discount / 100)).toFixed(2)} zł
											</p>
										)}

										<p
											className={`${
												promotedData.discount && promotedData.discount > 0
													? 'line-through text-gray-500'
													: 'text-lg font-semibold'
											}`}>
											{promotedData.price} zł
										</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				)
			)}
		</>
	)
}

export default PromotedCourse
