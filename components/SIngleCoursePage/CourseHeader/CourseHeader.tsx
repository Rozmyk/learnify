import formatTimestamp from '@/lib/formatTimestamp'
import StarRating from '@/components/ui/starRating'
import { ProfileDataProps, ReviewProps } from '@/types/api'
import Link from 'next/link'
const CourseHeader = ({
	title,
	description,
	profiles,
	reviews,
	created_at,
}: {
	title: string
	description: string
	profiles: ProfileDataProps
	reviews: ReviewProps[]
	created_at: string
}) => {
	return (
		<>
			<h1 className='text-4xl font-semibold mb-2'>{title}</h1>
			<p>{description}</p>
			<StarRating reviews={reviews} />
			<p className='text-muted-foreground text-sm'>
				Created by:{' '}
				<Link className='font-semibold text-primary' href={`/user/${profiles.username}`}>
					{profiles.username}
				</Link>
			</p>
			<p className='text-sm'>Last updated: {formatTimestamp(created_at)} </p>
		</>
	)
}

export default CourseHeader
