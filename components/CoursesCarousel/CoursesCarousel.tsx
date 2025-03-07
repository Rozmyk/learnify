'use client'
import React, { ReactNode } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import CourseCard from '../ui/CourseCard/CourseCard'
import useEmblaCarousel from 'embla-carousel-react'
import { CourseProps } from '@/types/api'
import Loading from './Loading/Loading'
import { PrevButton, NextButton, usePrevNextButtons } from '../EmblaButtons/EmblaButtons'

type PropType = {
	courses: CourseProps[]
	text: string | ReactNode
	loading?: boolean
	options?: EmblaOptionsType
}

const CoursesCarousel: React.FC<PropType> = props => {
	const { courses, options, text, loading } = props
	const [emblaRef, emblaApi] = useEmblaCarousel(options)
	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	return (
		<section className='embla'>
			<div className='flex justify-between items-center mb-2 '>
				<p className=' text-2xl font-semibold '>{text}</p>

				<div className='flex justify-center items-center '>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
			<div className='embla__viewport' ref={emblaRef}>
				<div className='embla__container'>
					{loading ? (
						<Loading />
					) : (
						courses &&
						courses.map(course => (
							<div className='embla__slide ' key={course.id}>
								<CourseCard {...course} />
							</div>
						))
					)}
				</div>
			</div>
		</section>
	)
}

export default CoursesCarousel
