import formatTimestamp from '@/lib/formatTimestamp'
import StarRating from '@/components/ui/starRating'
import { CourseProps } from '@/types/api'
import Link from 'next/link'
import { Earth, CircleAlert, TriangleAlert } from 'lucide-react'
interface CourseHeaderProps extends CourseProps {
	draftMode: boolean | undefined
}
const CourseHeader = ({ title, subtitle, profiles, reviews, created_at, languages, draftMode }: CourseHeaderProps) => {
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
					<p className='text-sm'>Language: {languages.name}</p>
				</div>
			</div>
			{draftMode && (
				<div className='bg-primary p-2 w-full text-secondary mt-4 flex justify-start gap-8  items-start '>
					<TriangleAlert size={35} />
					<div>
						<h4 className='font-semibold text-sm'>This course is in working mode.</h4>
						<p className='text-xs'>
							More information can be provided to you directly{' '}
							<Link className='capitalize font-semibold' href={`/user/${profiles.username}`}>
								{profiles.username}
							</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default CourseHeader
