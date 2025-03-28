import formatTimestamp from '@/lib/formatTimestamp'
import StarRating from '@/components/ui/starRating'
import { ProfileDataProps, ReviewProps } from '@/types/api'
import Link from 'next/link'
import { Earth, CircleAlert } from 'lucide-react'
const CourseHeader = ({
	title,
	subtitle,
	profiles,
	reviews,
	created_at,
	language,
}: {
	title: string
	subtitle: string
	profiles: ProfileDataProps
	reviews: ReviewProps[]
	created_at: string
	language: string
}) => {
	return (
		<div className='text-white'>
			<h1 className='text-4xl  font-semibold mb-2'>{title}</h1>
			<p className='mb-2'>{subtitle}</p>
			<StarRating reviews={reviews} />
			<p className='text-muted-foreground text-sm my-2'>
				Created by:{' '}
				<Link className='font-semibold text-white ' href={`/user/${profiles.username}`}>
					{profiles.username}
				</Link>
			</p>
			<div className='flex justify-start items-center gap-2'>
				<div className='flex justify-start items-center gap-2'>
					<CircleAlert size={16} />
					<p className='text-sm'>Last updated: {formatTimestamp(created_at)} </p>
				</div>
				<div className='flex justify-start items-center gap-2'>
					<Earth size={16} />
					<p className='text-sm'>Language: {language} </p>
				</div>
			</div>
		</div>
	)
}

export default CourseHeader
