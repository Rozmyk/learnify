import { TvMinimal, StickyNote, X } from 'lucide-react'
import { useState } from 'react'
import { SingleLessonProps } from '@/types/api'
import { Button } from '@/components/ui/button'
import * as Portal from '@radix-ui/react-portal'
import NoteModal from './NoteModal/NoteModal'
import VideoModal from './VideoModal/VideoModal'
const SingleLesson = ({ lesson }: { lesson: SingleLessonProps }) => {
	const [showModal, setShowModal] = useState(false)
	return (
		<>
			<div className='flex justify-between items-center border-b pb-2 pt-1'>
				<div className='flex justify-between items-center w-full'>
					<div className='flex gap-2 justify-start items-center'>
						{lesson.is_video ? <TvMinimal size={16} /> : <StickyNote size={16} />}
						<span className='font-medium text-muted-foreground'>{lesson.title}</span>
					</div>
					{lesson.is_preview && (
						<span
							onClick={() => {
								setShowModal(true)
							}}
							className='text-sm cursor-pointer text-primary underline'>
							Preview
						</span>
					)}
				</div>
				<span className='text-sm ml-2 text-muted-foreground'>{lesson.duration}</span>
			</div>
			{showModal && (
				<Portal.Root>
					<div
						onClick={() => setShowModal(false)}
						className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center'>
						<div
							onClick={e => e.stopPropagation()}
							className='bg-background w-full max-w-2xl rounded-lg shadow-lg p-6 relative'>
							<div className='flex items-center justify-between w-full mb-2'>
								<div className='flex flex-col justify-start items-start'>
									<p className='text-sm text-muted-foreground'>Course preview</p>
									<p className='text-lg font-semibold'>{lesson.title}</p>
								</div>
								<Button size='icon' variant='ghost' onClick={() => setShowModal(false)}>
									<X />
								</Button>
							</div>
							{lesson.is_video ? <VideoModal content={lesson.content} /> : <NoteModal content={lesson.content} />}
						</div>
					</div>
				</Portal.Root>
			)}
		</>
	)
}

export default SingleLesson
