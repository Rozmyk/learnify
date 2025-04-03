export interface CourseProps {
	title: string
	type_id: string
	types: TypeProps
	subtitle: string
	prices: PriceProps
	price_id: string
	thumbnail: string
	created_at: string
	author_id: string
	id: string
	reviews: ReviewProps[]
	categories_id: string
	categories: CategoryProps
	lang_id: string
	languages: LanguageProps
	profiles: ProfileDataProps
	slug: string
	skills_gained: string
	description: string
	requirements: string
	target_audience: string
	discount: number | null
	level_id: string
	levels: LevelProps
	avg_rating: number
	user_lessons_progress: UserLessonsProgressProps[]
	lessons: SingleLessonProps[]
	step_completed: number
	status: 'draft' | 'published' | 'archived'
	times_commited_id: string
	times_commited: TimeCommitmentProps
	currencies_id: string
	currencies: CurrenciesProps
	welcome_message: string
	congratulatory_message: string
}

export interface CategoryProps {
	name: string
	id: string
	created_at: string
	slug: string
	courseCount: number
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
	level: string
}
export interface UserLessonsProgressProps {
	id: string
	created_at: string
	user_id: string
	lesson_id: string
	lessons: SingleLessonProps
	course: CourseProps
	watched: boolean
}
export interface SingleLessonProps {
	id: string
	course_id: string
	title: string
	slug: string
	order: number
	created_at: string
	section_id: string
	is_preview: boolean
	duration: string
	video_url?: string
	content_json?: object
	user_lessons_progress: UserLessonsProgressProps[]
}
export interface SingleSectionProps {
	id: string
	created_at: string
	course_id: string
	title: string
	order: number
	lessons: SingleLessonProps[]
}
export interface ModalDataProps {
	isOpen: boolean
	content: 'AddRating' | 'EditRating' | 'DeleteRating' | null
}
export interface LanguageProps {
	id: string
	name: string
	lang_code: string
	course: CourseProps[]
}
export interface LevelProps {
	id: string
	name: string
	value: string
	course: CourseProps[]
}
export interface CurrenciesProps {
	id: string
	name: string
}
export interface PriceProps {
	id: string
	level: number
	value: number
}
export interface TypeProps {
	id: string
	name: string
	value: string
	description: string
	icon: string
}
export interface TimeCommitmentProps {
	id: string
	value: string
	label: string
}
