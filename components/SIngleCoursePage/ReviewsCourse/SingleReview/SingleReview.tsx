import { ReviewProps } from '@/types/api'
import Image from 'next/image'
import timeAgo from '@/lib/timeAgo'
import SimpleStarRating from '@/components/SimpleStarRating/SimpleStarRating'

const SingleReview = ({ review }: { review: ReviewProps }) => {
	return (
		<div className=' flex flex-col justify-start items-start gap-4 border-t border-border p-2 w-full'>
			<div className='flex justify-start items-center gap-2 '>
				<div className='w-12 h-12 min-h-12 min-w-12 relative rounded-full overflow-hidden'>
					<Image fill alt='user photo' src={review.profiles.avatar_url} />
				</div>
				<div className='flex flex-col justify-start items-start text-sm'>
					<p className='font-semibold'>{review.profiles.username}</p>
					<div className='flex justify-start items-center gap-2'>
						<SimpleStarRating stars={review.rating} />
						<p className='text-muted-foreground'>{timeAgo(review.created_at)}</p>
					</div>
				</div>
			</div>
			<p>{review.content}</p>
		</div>
	)
}

export default SingleReview
