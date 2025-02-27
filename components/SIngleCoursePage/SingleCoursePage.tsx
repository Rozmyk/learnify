'use client'
import { CourseProps } from '@/types/api'
import Loader from '../ui/loader'
import BackButton from './BackButton/BackButton'
import WhatYouLearn from './WhatYouLearn/WhatYouLearn'
import CourseIncludes from './CourseIncludes/CourseIncludes'
import CourseHeader from './CourseHeader/CourseHeader'
import SectionDescription from './SectionDescription/SectionDescription'
import AlsoBought from './AlsoBought/AlsoBought'
import InstructorsSection from './InstructorsSection/InstructorsSection'
import ReviewsCourse from './ReviewsCourse/ReviewsCourse'
import CoursePurchaseCard from './CoursePurchaseCard/CoursePurchaseCard'

const SingleCoursePage = ({ course }: { course: CourseProps }) => {
	return course ? (
		<>
			<div
				style={{
					backgroundImage: `url(${course.thumbnail})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				className='h-96 w-full rounded-lg relative   flex flex-col md:flex-row justify-between items-center gap-14 p-8 border border-border'>
				<BackButton />
				<div className='relative z-10 p-2 h-full flex flex-col justify-end items-start w-full md:w-2/3 '>
					<CourseHeader
						title={course.title}
						description={course.description}
						profiles={course.profiles}
						language={course.language}
						created_at={course.created_at}
						reviews={course.reviews}
					/>
				</div>
				<div className='w-full md:w-1/3   h-full relative z-10  px-8 '>
					<CoursePurchaseCard {...course} />
				</div>
				<div className='absolute bg-black opacity-55 top-0 left-0 right-0 bottom-0'></div>
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
			</div>

			<div className='md:w-2/3 w-full flex flex-col justify-start items-start gap-8'>
				{course.skills_gained && <WhatYouLearn skills_gained={course.skills_gained} />}
				<CourseIncludes />
				{course.requirements && <SectionDescription title='Requirements' text={course.requirements} />}
				{course.detailed_description && <SectionDescription title='Description' text={course.detailed_description} />}
				{course.target_audience && <SectionDescription title='Who this course is for:' text={course.target_audience} />}
				<AlsoBought course={course} />
				<InstructorsSection {...course.profiles} />
				<ReviewsCourse reviews={course.reviews} />
			</div>
		</>
	) : (
		<Loader />
	)
}

export default SingleCoursePage
