import { CourseProps, ReviewProps } from '@/types/api'

export function addRatingsToCourses(courses: CourseProps | CourseProps[]): CourseProps[] {
	const coursesArray = Array.isArray(courses) ? courses : [courses]

	return coursesArray.map(course => {
		const reviews: ReviewProps[] = course.reviews || []
		const reviewCount = reviews.length
		const avgRating = reviewCount > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount : null

		return { ...course, avgRating, reviewCount }
	})
}
