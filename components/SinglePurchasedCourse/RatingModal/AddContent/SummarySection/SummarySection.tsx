import { Button } from '@/components/ui/button'
import { ProfileDataProps } from '@/types/api'
import { Rating, RoundedStar } from '@smastrom/react-rating'
import Image from 'next/image'
import Loader from '@/components/ui/loader'
const myStyles = {
	itemShapes: RoundedStar,
	activeFillColor: '#fb923c',
	inactiveFillColor: '#a3a3a3',
}

const SummarySection = ({
	userData,
	rating,
	textareaValue,
	handleSendReview,
	errorMessage,
	buttonLoading,
}: {
	userData: ProfileDataProps | null
	rating: number
	textareaValue: string
	handleSendReview: () => void
	errorMessage: string
	buttonLoading: boolean
}) => {
	return (
		userData && (
			<div className='w-full h-full mt-4 flex flex-col justify-between items-center '>
				<div className='w-full'>
					<h4 className='font-semibold text-2xl text-center mb-2'>Thank you for helping our community!</h4>
					<p className='text-muted-foreground text-center'>Your review will become public within 24 hours.</p>
					<div className='flex flex-row justify-between gap-4 items-start mt-8 border-t border-b border-border py-8 px-4 w-full'>
						<div className='rounded-full w-14 h-14 min-w-14 min-h-14 relative overflow-hidden'>
							<Image alt='User profile photo' src={userData?.avatar_url} fill />
						</div>

						<div className='flex flex-col md:justify-between md:flex-row w-full gap-2 '>
							<p className='capitalize font-semibold '>{userData?.username}</p>
							<div className='md:w-1/2'>
								<Rating
									value={rating}
									readOnly={true}
									itemStyles={myStyles}
									style={{ maxWidth: 90 }}
									halfFillMode='svg'
								/>
								<p className='mt-4 break-words line-clamp-6'>
									{textareaValue ?? 'There are no written comments for your review.'}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='flex w-full justify-end items-center pt-4 border-t border-border'>
					<div className='flex flex-col justify-center items-end'>
						{errorMessage && <p className='text-red-400 mb-2'>{errorMessage}</p>}
						<Button onClick={handleSendReview}>{buttonLoading ? <Loader /> : 'Save and Exit'}</Button>
					</div>
				</div>
			</div>
		)
	)
}

export default SummarySection
