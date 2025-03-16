'use client'
import { UserLessonsProgressProps } from '@/types/api'
import SingleLessonCard from './SingleLessonCard/SingleLessonCard'
import { useState, useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Loading from './Loading/Loading'
import { PrevButton, NextButton, usePrevNextButtons } from '@/components/EmblaButtons/EmblaButtons'

const StartLearning = ({ options }: { options?: EmblaOptionsType }) => {
	const [lessons, setLessons] = useState<UserLessonsProgressProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	const [emblaRef, emblaApi] = useEmblaCarousel(options)
	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)
	const showButtons = lessons && lessons.length > 5

	useEffect(() => {
		const fetchLessons = async () => {
			try {
				const response = await fetch(`/api/user-lessons-progress`)

				if (!response.ok) {
					throw new Error('Failed to fetch lessons')
				}

				const data = await response.json()

				setLessons(data)
				setLoading(false)
			} catch (err) {
				console.error(err)
			}
		}

		fetchLessons()
	}, [])
	return (
		<section className='emblaLessons w-full'>
			<div className='relative'>
				{showButtons && (
					<>
						<div className='absolute flex justify-center items-center top-5 left-0 z-40 rounded-full bg-background border border-border -translate-x-1/2'>
							<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
						</div>
						<div className='absolute flex justify-center items-center top-5 right-0 z-40 rounded-full bg-background border border-border translate-x-1/2'>
							<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
						</div>
					</>
				)}

				<div className='embla__viewport ' ref={emblaRef}>
					<h2 className='text-3xl font-semibold mb-5'>Let's start learning</h2>
					<div className='embla__container'>
						{loading ? (
							<Loading />
						) : (
							lessons &&
							lessons.map(lesson => (
								<div className='embla__slide  ' key={lesson.id}>
									<SingleLessonCard {...lesson} />
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default StartLearning
