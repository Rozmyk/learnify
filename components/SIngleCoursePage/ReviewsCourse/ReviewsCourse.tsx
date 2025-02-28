import { ReviewProps } from '@/types/api'
import { addRatingsToCourses } from '@/lib/calcRatings'
import SingleReview from './SingleReview/SingleReview'
import { Button } from '@/components/ui/button'
import ReviewsModal from './ReviewsModal/ReviewsModal'
import ReviewsHeader from './ReviewsHeader/ReviewsHeader'
import Carousel from './Carousel/Carousel'

const ReviewsCourse = ({ reviews }: { reviews: ReviewProps[] }) => {
	const reviewData = addRatingsToCourses(reviews)
	const limitedReviews = reviews.slice(0, 4)
	return (
		<div className=' mb-20 max-w-full'>
			<ReviewsHeader reviewCount={reviewData.reviewCount} avgRating={reviewData.avgRating} />
			<div className='hidden md:block'>
				<div className='grid grid-cols-2 gap-8 p-2 '>
					{limitedReviews.map(review => {
						return <SingleReview key={review.id} review={review} />
					})}
				</div>
			</div>
			<div className='block md:hidden'>
				<Carousel reviews={limitedReviews} />
			</div>

			{reviews.length > 4 && (
				<ReviewsModal reviews={reviews}>
					<Button className='mt-6 w-full md:w-auto'>Show all reviews</Button>
				</ReviewsModal>
			)}
		</div>
	)
}

export default ReviewsCourse
