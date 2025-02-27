import { Star } from 'lucide-react'

interface RatingProps {
	stars: number
	maxStars?: number
}

const SimpleStarRating = ({ stars, maxStars = 5 }: RatingProps) => {
	return (
		<div className='flex gap-1'>
			{Array.from({ length: maxStars }, (_, i) => (
				<Star key={i} className='w-3 h-3 text-orange-400' fill={i < stars ? 'currentColor' : 'none'} />
			))}
		</div>
	)
}

export default SimpleStarRating
