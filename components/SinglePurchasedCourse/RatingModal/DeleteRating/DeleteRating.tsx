import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { ModalDataProps, ReviewProps } from '@/types/api'
import { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import Loader from '@/components/ui/loader'
const DeleteRating = ({
	setModalData,
	handleCloseModal,
	reviewData,
	setReviewData,
}: {
	handleCloseModal: () => void
	reviewData: ReviewProps | null
	setReviewData: Dispatch<SetStateAction<ReviewProps | null>>
	setModalData: Dispatch<SetStateAction<ModalDataProps>>
}) => {
	const [buttonLoading, setButtonLoading] = useState(false)
	const handleDeleteReview = async () => {
		setButtonLoading(true)
		if (reviewData) {
			try {
				const response = await fetch(`/api/delete-review?course_id=${reviewData.course_id}&review_id=${reviewData.id}`)

				if (!response.ok) {
					throw new Error('Error when deleting reviews')
				} else {
					setButtonLoading(false)
					setReviewData(null)
					handleCloseModal()
				}
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		reviewData && (
			<div className='flex flex-col justify-between items-start h-full'>
				<div className='w-full'>
					<div className='flex justify-between w-full items-center'>
						<h4 className='font-semibold text-lg'>Remove the review?</h4>
						<Button onClick={handleCloseModal} size='icon' variant='ghost'>
							<X />
						</Button>
					</div>

					<p className='text-muted-foreground py-4 '>Are you sure you want to delete your review?</p>
				</div>

				<div className='w-full flex justify-end items-center gap-4'>
					<Button
						variant='link'
						onClick={() => {
							setModalData({
								isOpen: true,
								content: 'EditRating',
							})
						}}>
						Cancel
					</Button>
					<Button onClick={handleDeleteReview}> {buttonLoading ? <Loader /> : 'Delete'}</Button>
				</div>
			</div>
		)
	)
}

export default DeleteRating
