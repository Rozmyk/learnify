import { useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import { ReviewProps, ModalDataProps } from '@/types/api'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import Skeleton from '@/components/ui/skeleton'
const RatingButton = ({
	reviewData,
	setModalData,
	loading,
}: {
	reviewData: ReviewProps | null
	setModalData: Dispatch<SetStateAction<ModalDataProps>>
	loading: boolean
}) => {
	const [isHovered, setIsHovered] = useState(false)

	return loading ? (
		<Skeleton className='w-24 h-8' />
	) : (
		<>
			{reviewData ? (
				<Button
					variant='ghost'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={e => {
						e.preventDefault()
						setModalData({
							isOpen: true,
							content: 'EditRating',
						})
					}}
					className='flex flex-col justify-start items-end'>
					<Rating style={{ maxWidth: 70 }} readOnly value={reviewData.rating} />
					<span className='text-xs '>{!isHovered ? 'Your rating' : 'Edit rating'}</span>
				</Button>
			) : (
				<Button
					onClick={e => {
						e.preventDefault()
						setModalData({
							isOpen: true,
							content: 'AddRating',
						})
					}}
					variant='ghost'
					className='flex flex-col justify-start items-end'>
					<Rating style={{ maxWidth: 70 }} readOnly value={0} />
					<span className='text-xs'>Leave a review</span>
				</Button>
			)}
		</>
	)
}

export default RatingButton
