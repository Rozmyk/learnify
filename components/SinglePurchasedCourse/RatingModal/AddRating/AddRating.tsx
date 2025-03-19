import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { createClient } from '@/utils/supabase/client'
import { ProfileDataProps, ReviewProps } from '@/types/api'
import SummarySection from '../AddContent/SummarySection/SummarySection'
import HeaderModal from '../HeaderModal/HeaderModal'
import AddContent from '../AddContent/AddContent'
const AddRating = ({
	handleCloseModal,
	course_id,
	setReviewData,
}: {
	handleCloseModal: () => void
	course_id: string
	setReviewData: Dispatch<SetStateAction<ReviewProps | null>>
}) => {
	const [rating, setRating] = useState<number>(0)
	const [userData, setUserData] = useState<ProfileDataProps | null>(null)
	const [hoverRating, setHoverRating] = useState(0)
	const [showTextarea, setShowTextarea] = useState(false)
	const [textareaValue, setTextareaValue] = useState('')
	const [showSummary, setShowSummary] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [buttonLoading, setButtonLoading] = useState(false)
	const handleSendReview = async () => {
		try {
			setButtonLoading(true)
			const formData = new FormData()
			formData.append('rating', String(rating))
			formData.append('course_id', course_id)
			formData.append('content', textareaValue)

			const response = await fetch('/api/add-review', {
				method: 'POST',
				body: formData,
			})
			const data = await response.json()
			if (data) {
				setReviewData(data.review)
			}

			setButtonLoading(false)
			if (!response.ok) {
				setErrorMessage('Unable to add review.')
			} else {
				console.log(data.message)
			}
			handleCloseModal()
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		setShowTextarea(rating > 0)
	}, [rating])
	useEffect(() => {
		const fetchUserData = async () => {
			const supabase = await createClient()
			const {
				data: { user },
			} = await supabase.auth.getUser()
			if (user) {
				const { data: fetchedUserData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
				setUserData(fetchedUserData)
			}
		}
		fetchUserData()
	}, [])
	return (
		<>
			<HeaderModal
				leftButtonAction={showSummary ? () => setShowSummary(false) : undefined}
				rightButtonAction={handleCloseModal}
			/>

			{showSummary ? (
				<SummarySection
					buttonLoading={buttonLoading}
					errorMessage={errorMessage}
					userData={userData}
					rating={rating}
					textareaValue={textareaValue}
					handleSendReview={handleSendReview}
				/>
			) : (
				<AddContent
					rating={rating}
					setRating={setRating}
					hoverRating={hoverRating}
					setHoverRating={setHoverRating}
					textareaValue={textareaValue}
					setTextareaValue={setTextareaValue}
					showTextarea={showTextarea}
					
					buttonAction={() => {
						setShowSummary(true)
					}}
				/>
			)}
		</>
	)
}

export default AddRating
