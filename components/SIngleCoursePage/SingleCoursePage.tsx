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
import MoreInstructorCourses from './MoreInstructorCourses/MoreInstructorCourses'
import Lessons from './Lessons/Lessons'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const SingleCoursePage = ({ course, draftMode }: { course: CourseProps; draftMode?: boolean }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		editable: false,
		content: course.description ?? '',
	})

	return course ? (
		<div className='relative w-full h-full  flex md:flex-row flex-col-reverse justify-between items-start'>
			<div className=' h-full w-full md:w-2/3 flex flex-col'>
				<div className=' hidden md:block'>
					<div
						style={{
							backgroundImage: `url(${course.thumbnail})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
						className='h-96 w-full rounded-lg relative    flex flex-col md:flex-row justify-between items-center gap-14 p-8 border border-border'>
						<BackButton />
						<div className='relative z-10 p-2 h-full flex flex-col justify-end items-start w-full md:w-2/3 '>
							<CourseHeader draftMode={draftMode} {...course} />
						</div>

						<div className='absolute bg-black opacity-55 top-0 left-0 right-0 bottom-0'></div>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
					</div>
				</div>
				<div className='w-full flex flex-col justify-start items-start gap-8 p-4'>
					{course.skills_gained && <WhatYouLearn skills_gained={course.skills_gained} />}
					<CourseIncludes />
					<Lessons course_id={course.id} />
					{course.requirements && <SectionDescription title='Requirements' text={course.requirements} />}

					<EditorContent editor={editor} />
					{course.target_audience && (
						<SectionDescription title='Who this course is for:' text={course.target_audience} />
					)}
					<AlsoBought courseId={course.id} />
					<InstructorsSection {...course.profiles} />
					{!draftMode && (
						<>
							<ReviewsCourse reviews={course.reviews} course_id={course.id} />
							<MoreInstructorCourses authorUsername={course.profiles.username} author_id={course.profiles.id} />
						</>
					)}
				</div>
			</div>

			<div className='md:w-1/3 w-full   md:p-8  relative md:sticky top-0 right-0  '>
				<CoursePurchaseCard draftMode={draftMode} {...course} />
			</div>
		</div>
	) : (
		<div className='min-h-screen flex justify-center items-center '>
			<Loader />
		</div>
	)
}

export default SingleCoursePage
