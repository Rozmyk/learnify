'use client'
import { CourseProps } from '@/types/api'
import Image from 'next/image'
import Loader from '../ui/loader'
import { Button } from '../ui/button'
import FavButton from '../FavButton/FavButton'
import BackButton from './BackButton/BackButton'
import Promotions from '../CartPage/Promotions/Promotions'
import WhatYouLearn from './WhatYouLearn/WhatYouLearn'
import CourseIncludes from './CourseIncludes/CourseIncludes'
import CourseHeader from './CourseHeader/CourseHeader'
import SectionDescription from './SectionDescription/SectionDescription'
import AlsoBought from './AlsoBought/AlsoBought'
import InstructorsSection from './InstructorsSection/InstructorsSection'
import ReviewsCourse from './ReviewsCourse/ReviewsCourse'

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
					<div className='md:sticky relative md:top-0 md:right-0 bg-background border border-border opacity-95 rounded-lg shadow-lg  '>
						<div className='w-full h-44 relative mb-4 rounded-lg overflow-hidden'>
							<Image fill src={course.thumbnail} alt='course photo' />
						</div>
						<div className='w-full p-4'>
							<div className='flex gap-2 justify-start items-center mb-4'>
								<p className='font-semibold text-2xl'>{course.price} zł</p>
								{course.discount && <p className='text-muted-foreground'>-{course.discount} % discount</p>}
							</div>

							<div className='flex gap-2 mb-4'>
								<Button className='w-full'>Add to cart</Button>
								<div>
									<FavButton variant='default' courseId={course.id} />
								</div>
							</div>
							<Button className='w-full'>Buy now</Button>
							<p className='text-sm text-center my-2 text-muted-foreground'>30-day money back guarantee</p>
							<Button variant='link'>Share</Button>
							<Promotions withoutText />
						</div>
					</div>
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
