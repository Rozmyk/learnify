import { CourseProps } from '@/types/api'
import Image from 'next/image'
import ProgressComponent from '@/components/ProgressComponent/ProgressComponent'
import Link from 'next/link'

const SingleOwnedCourse = ({ thumbnail, title, user_lessons_progress, lessons, slug }: CourseProps) => {
	const courseProgress = user_lessons_progress.length > 0 ? (user_lessons_progress.length / lessons.length) * 100 : 0
	return (
		<Link href={`/course/${slug}/learn`}>
			<div className='flex gap-4 p-2 items-start justify-between'>
				<div className='w-16 h-16 min-w-16 min-h-16 relative rounded-lg overflow-hidden'>
					<Image src={thumbnail} className='object-cover' alt='course photo' fill />
				</div>
				<div className='flex-1'>
					<p className='font-semibold text-sm mb-2 line-clamp-2  '>{title}</p>
					{courseProgress ? (
						<ProgressComponent value={courseProgress} />
					) : (
						<span className='font-semibold text-sm text-muted-foreground'>Start learning</span>
					)}
				</div>
			</div>
		</Link>
	)
}

export default SingleOwnedCourse
