'use client'

import { SingleSectionProps } from '@/types/api'
import Loader from '@/components/ui/loader'
import { useState, useEffect } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
const SingleSection = ({
	section,
	currentLessonId,
}: {
	section: SingleSectionProps
	currentLessonId: string | null
}) => {
	const router = useRouter()

	return (
		<Accordion.Root type='multiple' className='w-full border rounded-md'>
			<Accordion.Item value={section.id}>
				<Accordion.Header className='cursor-pointer'>
					<Accordion.Trigger className='flex justify-between items-center w-full p-4 text-left font-semibold bg-background transition'>
						<div>{section.title}</div>
						{/* <div className='text-sm text-gray-600'>
							{completedCount} / {lessons.length} | {totalDuration} min
						</div> */}
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content>
					<ul className='flex flex-col gap-2 mt-2'>
						{section.lessons.map((lesson, index) => (
							<li
								onClick={() => router.push(`/course/next-auth/learn/${lesson.id}`)}
								key={lesson.id}
								className={`flex items-start gap-3 p-4 px-6 rounded-md transition cursor-pointer ${currentLessonId === lesson.id ? 'bg-secondary' : 'bg-background'}`}>
								{/* <button onClick={() => toggleLesson(index)} className='mt-1' aria-label='Toggle lesson'>
									{checkedLessons[index] ? (
										<CheckSquare className='text-purple-600' size={20} />
									) : (
										<Square className='text-gray-400' size={20} />
									)}
								</button> */}
								<div>
									<p className='text-sm font-medium'>
										{index + 1}. {lesson.title}
									</p>
									<p className='text-xs text-muted-foreground'>{lesson.duration} min</p>
								</div>
							</li>
						))}
					</ul>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	)
}
const LessonsSidebar = ({ lessonId, courseId }: { lessonId: string | null; courseId: string | null }) => {
	const [loading, setLoading] = useState(true)
	const [sections, setSections] = useState<SingleSectionProps[] | null>(null)

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
				console.log(data)
				setLoading(false)
			} catch (err) {
				console.error(err)
			}
		}

		fetchSections()
	}, [courseId])

	if (loading) {
		return (
			<div className='w-full flex justify-center items-center py-8 '>
				<Loader />
			</div>
		)
	}

	return (
		<div className='sticky top-0 left-0 right-0 w-full'>
			{sections?.map(lesson => <SingleSection section={lesson} currentLessonId={lessonId} />)}
		</div>
	)
}

export default LessonsSidebar
