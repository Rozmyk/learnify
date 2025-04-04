'use client'

import { SingleSectionProps } from '@/types/api'
import Loader from '@/components/ui/loader'
import { useState, useEffect } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, SquareCheck, TvMinimal, StickyNote, Square } from 'lucide-react'
import getTotalDuration from '@/lib/getTotalDuration'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
const SingleSection = ({
	section,
	currentLessonId,
	courseSlug,
}: {
	section: SingleSectionProps
	currentLessonId: string | null
	courseSlug: string
}) => {
	const router = useRouter()
	const shouldByOpen = section.lessons.some(item => item.id == currentLessonId)
	const totalDuration = getTotalDuration(section.lessons)
	const totalWatched = section.lessons
		.filter(lesson => lesson.user_lessons_progress[0]?.watched)
		.map(lesson => lesson.id)

	return (
		<Accordion.Root
			defaultValue={shouldByOpen ? [section.id] : []}
			type='multiple'
			className='w-full border rounded-md'>
			<Accordion.Item value={section.id}>
				<Accordion.Header className='cursor-pointer'>
					<Accordion.Trigger className='flex justify-between items-center w-full p-4 text-left font-semibold bg-background transition'>
						<div>
							<p className='font-semibold'>{section.title}</p>
							<div className='text-xs text-muted-foreground'>
								{totalWatched.length} / {section.lessons.length} | {totalDuration} min
							</div>
						</div>
						<div>
							<ChevronDown size={16} />
						</div>
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content>
					<ul className='flex flex-col gap-2 mt-2'>
						{section.lessons.map((lesson, index) => (
							<li
								onClick={() => router.push(`/course/${courseSlug}/learn/${lesson.id}`)}
								key={lesson.id}
								className={`flex items-start gap-3 p-4 px-6 rounded-md transition cursor-pointer ${currentLessonId === lesson.id ? 'bg-secondary' : 'bg-background'}`}>
								{lesson.user_lessons_progress[0]?.watched ? (
									<button className='mt-1' aria-label='Toggle lesson'>
										<SquareCheck color='black' fill='white' size={20} />
									</button>
								) : (
									<button className='mt-1' aria-label='Toggle lesson'>
										<Square size={20} />
									</button>
								)}
								<div>
									<p className='text-sm font-medium mb-1'>
										{index + 1}. {lesson.title}
									</p>
									<div className='flex justify-start items-center gap-1 text-muted-foreground'>
										{lesson.video_url ? <TvMinimal size={14} /> : <StickyNote size={14} />}
										<p className='text-xs '>{lesson.duration} min</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	)
}
const LessonsSidebar = ({ courseId, courseSlug }: { courseId: string | null; courseSlug: string }) => {
	const [loading, setLoading] = useState(true)
	const [sections, setSections] = useState<SingleSectionProps[] | null>(null)
	const params = useParams()
	const lessonId = params?.lessonId as string
	useEffect(() => {
		if (!lessonId) return

		const fetchSections = async () => {
			try {
				const response = await fetch(`/api/get-lessons?lessonId=${lessonId}`)

				if (!response.ok) {
					throw new Error('Failed to fetch lessons')
				}

				const data = await response.json()
				setSections(data.sections)
				setLoading(false)
			} catch (err) {
				console.error(err)
			}
		}

		fetchSections()
	}, [courseId])

	if (loading) {
		return (
			<div className='w-full h-full flex justify-center items-center py-8 '>
				<Loader />
			</div>
		)
	}

	return (
		<div className='sticky top-0 left-0 right-0 w-full'>
			{sections?.map(lesson => (
				<SingleSection courseSlug={courseSlug} key={lesson.id} section={lesson} currentLessonId={lessonId} />
			))}
		</div>
	)
}

export default LessonsSidebar
