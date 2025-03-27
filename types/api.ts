export enum LevelProps {
	Begginer = 'Begginer',
	Intermediate = 'Intermediate',
	Advanced = 'Advanced',
}
export type TimeCommitment = '0-2' | '2-4' | '5+' | 'undecided'
export interface CourseProps {
	title: string
	type: 'course' | 'practice'
	subtitle: string
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
	description: string
	requirements: string
	target_audience: string
	discount: number | null
	language: string
	level: LevelProps
	avg_rating: number
	user_lessons_progress: UserLessonsProgressProps[]
	lessons: SingleLessonProps[]
	step_completed: number
	status: 'draft' | 'published' | 'archived'
	time_commitment: TimeCommitment
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
	level: 'beginner' | 'intermediate' | 'advanced'
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
