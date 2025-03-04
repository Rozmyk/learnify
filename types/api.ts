export enum LevelProps {
	Begginer = 'Begginer',
	Intermediate = 'Intermediate',
	Advanced = 'Advanced',
}

export interface CourseProps {
	title: string
	description: string
	price: number
	thumbnail: string
	created_at: string
	author_id: string
	id: string
	reviews: ReviewProps[]
	categories_id: string
	categories: CategoryProps
	profiles: ProfileDataProps
	slug: string
	skills_gained: string
	detailed_description: string
	requirements: string
	target_audience: string
	discount: number | null
	language: string
	level: LevelProps
}

export interface CategoryProps {
	name: string
	id: string
	created_at: string
	slug: string
}
export interface ReviewProps {
	id: string
	rating: number
	author_id: string
	course_id: string
	profiles: ProfileDataProps
	content: string
	created_at: string
}
export interface ProfileDataProps {
	id: string
	website: string | null
	description: string | null
	username: string
	created_at: string
	avatar_url: string
	header: string | null
	email: string
	isTeacher: boolean
	lastViewedCourseId: string | null
}
export interface SingleFavCourseProps {
	id: string
	created_at: string
	user_id: string
	course_id: string
}
export interface CartItemProps {
	id?: string
	created_at?: string
	user_id?: string
	product_id: string
	updated_at?: string
	course?: CourseProps
}
export interface PromocodeProps {
	value: string
	discount: number
	created_at: string
	id: string
}
export interface ownedCourseProps {
	course: CourseProps
	created_at: string
	user_id: string
	id: string
	course_id: string
}
export interface FilterProps {
	sortBy: string | null
	free: boolean
	payable: boolean
	level: 'beginner' | 'intermediate' | 'advanced'
}
