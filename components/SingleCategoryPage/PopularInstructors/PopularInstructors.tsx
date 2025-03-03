'use client'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import { useState, useEffect } from 'react'
import SingleInstructorCard from './SingleInstructorCard/SingleInstructorCard'
import Loader from '@/components/ui/loader'
import { ProfileDataProps } from '@/types/api'
import useEmblaCarousel from 'embla-carousel-react'
import { PrevButton, NextButton, usePrevNextButtons } from '../../EmblaButtons/EmblaButtons'
const PopularInstructors = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel()
	const [instructorsData, setInstructorsData] = useState<ProfileDataProps[] | null>(null)
	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/instructors')
				if (!response.ok) {
					throw new Error('Failed to fetch instructors')
				}
				const data = await response.json()
				setInstructorsData(data)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [])
	return (
		<section className='emblaInstructors '>
			<div className='my-8 '>
				{loading ? (
					<div className='w-full h-full flex justify-center items-center'>
						<Loader />
					</div>
				) : (
					<>
						<div className='flex justify-between items-center mb-2 '>
							<SectionTitle additionalText='These experts with practical experience are highly regarded by participants like you.'>
								Popular instructors
							</SectionTitle>

							<div className='flex justify-center items-center '>
								<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
								<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
							</div>
						</div>
						<div className='embla__viewport' ref={emblaRef}>
							<div className='embla__container'>
								{instructorsData?.map(instructor => {
									return (
										<div className='embla__slide min-h-36' key={instructor.id}>
											{' '}
											<SingleInstructorCard {...instructor} />
										</div>
									)
								})}
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	)
}

export default PopularInstructors
