import { Rating, RoundedStar } from '@smastrom/react-rating'
import { Dispatch, SetStateAction } from 'react'
const myStyles = {
	itemShapes: RoundedStar,
	activeFillColor: '#fb923c',
	inactiveFillColor: '#a3a3a3',
}

const RatingSection = ({
	rating,
	setRating,
	hoverRating,
	setHoverRating,
}: {
	rating: number
	setRating: Dispatch<SetStateAction<number>>
	hoverRating: number
	setHoverRating: Dispatch<SetStateAction<number>>
}) => {
	const textArray = [
		{
			number: 0,
			text: 'Select ratings',
		},
		{
			number: 1,
			text: 'Fatal, I expected something completely different',
		},
		{
			number: 2,
			text: 'Weak, I am rather disappointed(s)',
		},
		{
			number: 3,
			text: 'Average, could be better',
		},
		{
			number: 4,
			text: 'Good, what I expected(s)',
		},
		{
			number: 5,
			text: 'Great, above expectations!',
		},
	]
	return (
		<div>
			<h4 className='text-2xl font-semibold text-center mb-4'>
				{!rating ? 'How would you rate this course?' : 'Why such a rating?'}
			</h4>

			<p className='text-center text-muted-foreground font-semibold mb-4 text-lg'>
				{textArray.find(item => item.number === (hoverRating > 0 ? hoverRating : rating))?.text || ''}
			</p>

			<div className='flex justify-center items-center py-8'>
				<Rating
					onHoverChange={setHoverRating}
					itemStyles={myStyles}
					style={{ maxWidth: 220 }}
					value={rating}
					onChange={setRating}
					halfFillMode='svg'
				/>
			</div>
		</div>
	)
}

export default RatingSection
