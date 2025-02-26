import { addRatingsToCourses } from '@/lib/calcRatings'
import { ReviewProps } from '@/types/api'
const StarRating = ({ reviews }: { reviews: ReviewProps[] | null }) => {
	const ratingsData = reviews ? addRatingsToCourses(reviews) : null
	const rating = ratingsData?.avgRating ?? 0
	const count = ratingsData?.reviewCount ?? 0

	const fullStars = Math.floor(rating)
	const halfStar = rating % 1 >= 0.5
	const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

	return (
		<div className='flex items-center gap-1'>
			<span className='font-medium text-sm'>{rating.toFixed(1)}</span>
			<div className='flex'>
				{'★'
					.repeat(fullStars)
					.split('')
					.map((_, i) => (
						<span key={`full-${i}`} className='text-yellow-300'>
							★
						</span>
					))}
				{halfStar && <span className='text-yellow-300'>☆</span>}
				{'★'
					.repeat(emptyStars)
					.split('')
					.map((_, i) => (
						<span key={`empty-${i}`} className='text-gray-300'>
							★
						</span>
					))}
			</div>
			<span className='text-sm text-muted-foreground ml-1'>({count})</span>
		</div>
	)
}

export default StarRating
