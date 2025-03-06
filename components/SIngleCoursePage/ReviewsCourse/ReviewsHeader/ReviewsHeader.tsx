const ReviewsHeader = ({ avgRating, reviewCount }: { avgRating: number; reviewCount: number }) => {
	return (
		<div className='flex justify-start items-center gap-2  py-2 mb-2'>
			<span className='text-orange-400 text-3xl'>★</span>
			<p className='font-semibold  text-lg md:text-2xl'>{avgRating?.toFixed(1)} course rating</p>
			<span className='text-lg md:text-2xltext-muted-foreground'>&#8226;</span>
			<p className='font-semibold text-lg md:text-2xl'>{reviewCount} ratings</p>
		</div>
	)
}

export default ReviewsHeader
