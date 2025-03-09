import { CourseProps } from '@/types/api'
import Image from 'next/image'
import Link from 'next/link'
import ProgressComponent from '../ProgressComponent/ProgressComponent'
import SimpleStarRating from '../SimpleStarRating/SimpleStarRating'

const SinglePurchasedCourse = ({ title, profiles, thumbnail, reviews, slug }: CourseProps) => {
	return (
		<Link href={`/course/${slug}`}>
			<div className='w-80 max-w-80 mix-w-80  p-2'>
				<div className='relative w-full h-40'>
					<Image fill src={thumbnail} alt='course image' />
				</div>
				<h3 className='line-clamp-2 font-semibold mt-2'>{title}</h3>
				<p className='capitalize text-muted-foreground text-sm mb-4'>{profiles.username}</p>
				<ProgressComponent value={95} />
				<div className='flex justify-between items-center py-2'>
					<p className='text-xs text-muted-foreground'>Completed 95%</p>
					<div className='flex flex-col gap-.05'>
						<SimpleStarRating stars={4} />
						<p className='text-xs text-muted-foreground'>Your review</p>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default SinglePurchasedCourse
