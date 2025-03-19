import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ReviewProps } from '@/types/api'
import * as Portal from '@radix-ui/react-portal'
import RatingButton from './RatingButton/RatingButton'
import '@smastrom/react-rating/style.css'
import { ModalDataProps } from '@/types/api'
import EditRating from './EditRating/EditRating'
import AddRating from './AddRating/AddRating'
import DeleteRating from './DeleteRating/DeleteRating'

const RatingModal = ({
	setModalData,
	modalData,
	course_id,
}: {
	setModalData: Dispatch<SetStateAction<ModalDataProps>>
	course_id: string
	modalData: ModalDataProps
}) => {
	const [reviewData, setReviewData] = useState<ReviewProps | null>(null)
	const [reviewLoading, setReviewLoading] = useState(true)

	useEffect(() => {
		const fetchReviewedStatus = async () => {
			try {
				const response = await fetch(`/api/course/reviewed?course_id=${course_id}`)
				const data = await response.json()

				setReviewData(data)
				setReviewLoading(false)
			} catch (err) {}
		}
		if (course_id) {
			fetchReviewedStatus()
		}
	}, [course_id])
	useEffect(() => {
		console.log(reviewData)
	}, [reviewData])
	const handleCloseModal = () => {
		setModalData({ isOpen: false, content: null })
	}
	let currentContent
	switch (modalData?.content) {
		case 'AddRating':
			currentContent = (
				<AddRating setReviewData={setReviewData} handleCloseModal={handleCloseModal} course_id={course_id} />
			)
			break
		case 'EditRating':
			currentContent = (
				<EditRating
					setReviewData={setReviewData}
					setModalData={setModalData}
					reviewData={reviewData}
					handleCloseModal={handleCloseModal}
				/>
			)
			break
		case 'DeleteRating':
			currentContent = (
				<DeleteRating
					setReviewData={setReviewData}
					setModalData={setModalData}
					reviewData={reviewData}
					handleCloseModal={handleCloseModal}
				/>
			)
			break
		default:
			currentContent = null
	}
	return (
		<>
			<RatingButton loading={reviewLoading} reviewData={reviewData} setModalData={setModalData} />

			{modalData.isOpen && (
				<Portal.Root>
					<div
						onClick={e => {
							e.stopPropagation()
							handleCloseModal()
						}}
						className='fixed inset-0  z-50 bg-black/80 flex items-center justify-center'>
						<div
							onClick={e => e.stopPropagation()}
							className='bg-background w-full max-w-2xl rounded-lg shadow-lg p-6 relative md:h-auto h-screen flex flex-col '>
							{currentContent}
						</div>
					</div>
				</Portal.Root>
			)}
		</>
	)
}

export default RatingModal
