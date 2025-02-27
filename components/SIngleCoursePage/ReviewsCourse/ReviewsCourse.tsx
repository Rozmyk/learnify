import { ReviewProps } from '@/types/api'
import { addRatingsToCourses } from '@/lib/calcRatings'
import SingleReview from './SingleReview/SingleReview'

const ReviewsCourse = ({ reviews }: { reviews: ReviewProps[] }) => {
	const reviewData = addRatingsToCourses(reviews)
	return (
		<div className=' mb-20'>
			<div className='flex justify-start items-center gap-2  py-8 mb-2'>
				<span className='text-orange-400 text-3xl'>★</span>
				<p className='font-semibold text-2xl'>{reviewData.avgRating} course rating</p>
				<span className='text-2xl text-muted-foreground'>&#8226;</span>
				<p className='font-semibold text-2xl'>{reviewData.reviewCount} ratings</p>
			</div>
			<div className='grid grid-cols-2 gap-8 p-2'>
				{reviews.map(review => {
					return <SingleReview key={review.id} review={review} />
				})}
			</div>
		</div>
	)
}

export default ReviewsCourse
