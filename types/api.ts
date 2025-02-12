export interface CourseProps {
	title: string
	description: string
	price: string
	thumbnail: string
	created_at: string
	author_id: string
	id: string
	avgRating: number | null
	reviewCount: number | null
}
export interface ReviewProps {
	rating: number
	author_id: string
	course_id: string
	content: string
	created_at: string
}
