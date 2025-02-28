'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'

import useEmblaCarousel from 'embla-carousel-react'
import SingleReview from '../SingleReview/SingleReview'

import { ReviewProps } from '@/types/api'

type PropType = {
	reviews: ReviewProps[]
	options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = props => {
	const { reviews, options } = props
	const [emblaRef] = useEmblaCarousel(options)

	return (
		<section className='embla'>
			<div className='embla__viewport' ref={emblaRef}>
				<div className='embla__container'>
					{reviews &&
						reviews.map(review => (
							<div className='embla__slide ' key={review.id}>
								<SingleReview review={review} />
							</div>
						))}
				</div>
			</div>
		</section>
	)
}

export default Carousel
