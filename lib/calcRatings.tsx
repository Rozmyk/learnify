import { CourseProps, ReviewProps } from '@/types/api'

export function addRatingsToCourses(reviews: ReviewProps[]) {
	const reviewCount = reviews.length
	const avgRating = reviewCount > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount : null
	return { avgRating, reviewCount }
}
