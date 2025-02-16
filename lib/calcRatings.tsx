import { CourseProps, ReviewProps } from '@/types/api'

type CoursesInput = CourseProps | CourseProps[]

export function addRatingsToCourses(courses: CoursesInput): CoursesInput {
	const calculateRatings = (course: CourseProps): CourseProps => {
		const reviews: ReviewProps[] = course.reviews || []
		const reviewCount = reviews.length
		const avgRating = reviewCount > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount : null

		return { ...course, avgRating, reviewCount }
	}

	if (Array.isArray(courses)) {
		return courses.map(calculateRatings)
	}

	if (courses) {
		return calculateRatings(courses)
	}

	return courses
}
