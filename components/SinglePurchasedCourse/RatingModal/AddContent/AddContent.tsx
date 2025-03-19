import RatingSection from './RatingSection/RatingSection'
import TextareaSection from '../AddRating/TextareaSection/TextareaSection'
import { Button } from '@/components/ui/button'
import { SetStateAction, Dispatch } from 'react'
import Loader from '@/components/ui/loader'
const AddContent = ({
	rating,
	setRating,
	hoverRating,
	setHoverRating,
	textareaValue,
	setTextareaValue,
	showTextarea,
	buttonAction,
	buttonLoading,
}: {
	rating: number
	setRating: Dispatch<SetStateAction<number>>
	hoverRating: number
	setHoverRating: Dispatch<SetStateAction<number>>
	textareaValue: string
	setTextareaValue: Dispatch<SetStateAction<string>>
	showTextarea: boolean
	buttonLoading?: boolean

	buttonAction: () => void
}) => {
	return (
		<div className='flex flex-col flex-1 w-full justify-between items-center'>
			<div className='w-full mt-4'>
				<RatingSection
					rating={rating}
					setRating={setRating}
					hoverRating={hoverRating}
					setHoverRating={setHoverRating}
				/>
				<TextareaSection
					textareaValue={textareaValue}
					setTextareaValue={setTextareaValue}
					showTextarea={showTextarea}
				/>
			</div>
			{rating > 0 && (
				<div className='flex w-full justify-end items-center'>
					<Button onClick={buttonAction}>{buttonLoading ? <Loader /> : 'Save and continue'}</Button>
				</div>
			)}
		</div>
	)
}

export default AddContent
