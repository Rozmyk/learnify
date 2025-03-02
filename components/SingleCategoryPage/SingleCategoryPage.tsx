import { CourseProps, CategoryProps } from '@/types/api'
import CoursesCarousel from '../CoursesCarousel/CoursesCarousel'
import PromotedCourse from '../ProtectedHeader/PromotedCourse/PromotedCourse'
import SectionTitle from '../SectionTitle/SectionTitle'
import { CircleAlert } from 'lucide-react'
import CoursesFilterableList from './CoursesFilterableList/CoursesFilterableList'

const SingleCategoryPage = ({
	category,
	courses,
	slug,
}: {
	category: CategoryProps
	courses: CourseProps[]
	slug: string
}) => {
	return (
		<>
			<h1 className='text-4xl font-semibold mt-8'>Courses from the {category.name} category</h1>

			<CoursesCarousel
				courses={courses}
				text={
					<SectionTitle additionalText='Discover courses created by experts with practical experience.'>
						Courses from the {category.name} category
					</SectionTitle>
				}
			/>

			<PromotedCourse />
			<SectionTitle>All courses in the {slug} category</SectionTitle>
			<div className='p-8 -full border border-border flex justify-start items-center gap-2 rounded-lg'>
				<CircleAlert size={20} />
				<p className='font-semibold'>Can't make up your mind? All courses have a 30-day money back guarantee</p>
			</div>
			<CoursesFilterableList />
		</>
	)
}

export default SingleCategoryPage
