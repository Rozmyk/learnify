import { UserLessonsProgressProps } from '@/types/api'
import Link from 'next/link'
import { StickyNote, Monitor } from 'lucide-react'
const SingleLessonCard = ({ course, lessons }: UserLessonsProgressProps) => {
	const icon_size = 45
	return (
		<Link href={`/course/${course.slug}/learn/${lessons.id}`}>
			<div className=' h-40  border border-border flex justify-between items-start '>
				<div className='w-40 h-full bg-primary text-secondary flex justify-center items-center'>
					{lessons.video_url ? <Monitor size={icon_size} /> : <StickyNote size={icon_size} />}
				</div>
				<div className='w-full h-full flex flex-col items-start justify-between  p-4'>
					<div>
						<p className='text-xs text-muted-foreground mb-1 line-clamp-1'>{course.title}</p>
						<h4 className='font-semibold line-clamp-1'>
							{lessons.order}. {lessons.title}
						</h4>
					</div>
					<div>
						<span className='font-semibold text-xs text-muted-foreground'>
							{lessons.video_url ? 'Video' : 'Note'} &#x2022; {lessons.duration} min
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default SingleLessonCard
