import * as Dialog from '@radix-ui/react-dialog'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'
import { X } from 'lucide-react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import ReviewsHeader from '../ReviewsHeader/ReviewsHeader'
import SingleReview from '../SingleReview/SingleReview'
import { ReviewProps } from '@/types/api'
import { addRatingsToCourses } from '@/lib/calcRatings'
import Loader from '@/components/ui/loader'

const ReviewsModal = ({
	children,
	reviews,
	course_id,
}: {
	children: ReactNode
	reviews: ReviewProps[]
	course_id: string
}) => {
	const reviewsData = addRatingsToCourses(reviews)
	const [data, setData] = useState<ReviewProps[] | null>(null)
	const [loading, setLoading] = useState(true)

	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => {
		setIsOpen(true)
	}
	const handleClose = () => {
		setIsOpen(false)
	}
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await fetch(`/api/reviews?course_id=${course_id}`)
				const result = await response.json()

				if (result.error) {
					console.log(result.error)
				} else {
					setData(result.courses)
					setLoading(false)
				}
			} catch (err) {
				console.log(err)
			}
		}

		if (course_id) {
			fetchReviews()
		}
	}, [course_id])
	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger onClick={handleOpen} asChild>
				{children}
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='bg-black bg-opacity-60 fixed inset-0 z-40' />
				<Dialog.Content className='fixed top-1/2 left-1/2 w-full max-w-3xl bg-secondary rounded-lg shadow-lg flex flex-col justify-start items-start z-50 transform -translate-x-1/2 -translate-y-1/2'>
					<Dialog.Title className='w-full'>
						<div className='flex justify-between items-center w-full p-4'>
							<ReviewsHeader avgRating={reviewsData.avgRating} reviewCount={reviewsData.reviewCount} />
							<Button variant='secondary' onClick={handleClose} className='rounded-full ' size='icon'>
								<X />
							</Button>
						</div>
					</Dialog.Title>
					<div className='flex flex-col justify-start items-center p-4 gap-8 w-full'>
						<ScrollArea.Root>
							<ScrollArea.Viewport style={{ maxHeight: '80vh', height: '100%' }}>
								<ScrollArea.Scrollbar orientation='vertical'>
									<ScrollArea.Thumb />
								</ScrollArea.Scrollbar>
								{loading ? (
									<div className='flex justify-center items-center h-[80vh] w-full'>
										<div className='w-full text-center'>
											<Loader />
										</div>
									</div>
								) : (
									data &&
									data.map(review => {
										return <SingleReview key={review.id} review={review} />
									})
								)}
							</ScrollArea.Viewport>
						</ScrollArea.Root>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default ReviewsModal
