import { Rating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { ModalDataProps, ReviewProps } from '@/types/api'
import { Dispatch, SetStateAction, useState } from 'react'
import AddContent from '../AddContent/AddContent'
import HeaderModal from '../HeaderModal/HeaderModal'
const EditRating = ({
	handleCloseModal,
	reviewData,
	setModalData,
	setReviewData,
}: {
	handleCloseModal: () => void
	reviewData: ReviewProps | null
	setModalData: Dispatch<SetStateAction<ModalDataProps>>
	setReviewData: Dispatch<SetStateAction<ReviewProps | null>>
}) => {
	const [isEdited, setIsEdited] = useState(false)
	const [rating, setRating] = useState<number>(reviewData?.rating ?? 0)
	const [hoverRating, setHoverRating] = useState(0)
	const [buttonLoading, setButtonLoading] = useState(false)
	const [textareaValue, setTextareaValue] = useState(reviewData?.content ?? '')

	const handleUpdateReview = async () => {
		try {
			setButtonLoading(true)
			const response = await fetch('/api/update-review', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					rating,
					review_id: reviewData?.id,
					content: textareaValue,
				}),
			})

			const data = await response.json()
			if (data) {
				setReviewData(data.review)
			}
			setButtonLoading(false)

			if (!response.ok) {
				console.error('Error:', data.error || response.status)
			}

			handleCloseModal()
		} catch (err) {
			console.log('Fetch error:', err)
		}
	}

	return (
		reviewData && (
			<>
				{!isEdited ? (
					<div className='flex flex-col justify-between items-start h-full'>
						<div className='w-full'>
							<div className='flex justify-between w-full items-center'>
								<h4 className='font-semibold text-lg'>Your review</h4>
								<Button onClick={handleCloseModal} size='icon' variant='ghost'>
									<X />
								</Button>
							</div>
							<Rating style={{ maxWidth: 120 }} value={reviewData?.rating} readOnly />
							<p className='text-muted-foreground py-4 '>
								{reviewData.content ?? 'There are no written comments for your review.'}
							</p>
						</div>

						<div className='w-full flex justify-end items-center gap-4'>
							<Button
								variant='link'
								onClick={() => {
									setModalData({
										isOpen: true,
										content: 'DeleteRating',
									})
								}}>
								Delete
							</Button>
							<Button
								onClick={() => {
									setIsEdited(true)
								}}>
								Edit review
							</Button>
						</div>
					</div>
				) : (
					<div>
						<HeaderModal rightButtonAction={handleCloseModal} />
						<AddContent
							rating={rating}
							setRating={setRating}
							hoverRating={hoverRating}
							setHoverRating={setHoverRating}
							textareaValue={textareaValue}
							setTextareaValue={setTextareaValue}
							showTextarea={true}
							buttonAction={handleUpdateReview}
							buttonLoading={buttonLoading}
						/>
					</div>
				)}
			</>
		)
	)
}

export default EditRating
