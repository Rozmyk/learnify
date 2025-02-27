import { ReviewProps } from '@/types/api'
import { addRatingsToCourses } from '@/lib/calcRatings'
import SingleReview from './SingleReview/SingleReview'
import { Button } from '@/components/ui/button'
import ReviewsModal from './ReviewsModal/ReviewsModal'
import ReviewsHeader from './ReviewsHeader/ReviewsHeader'

const ReviewsCourse = ({ reviews }: { reviews: ReviewProps[] }) => {
	const reviewData = addRatingsToCourses(reviews)
	return (
		<div className=' mb-20'>
			<ReviewsHeader reviewCount={reviewData.reviewCount} avgRating={reviewData.avgRating} />
			<div className='grid grid-cols-2 gap-8 p-2'>
				{reviews.map(review => {
					return <SingleReview key={review.id} review={review} />
				})}
			</div>

			<ReviewsModal reviews={reviews}>
				<Button className='mt-6'>Show all reviews</Button>
			</ReviewsModal>
		</div>
	)
}

export default ReviewsCourse
