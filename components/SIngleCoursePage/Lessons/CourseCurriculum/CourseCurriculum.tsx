'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { SingleSectionProps } from '@/types/api'
import { TvMinimal, StickyNote } from 'lucide-react'
import * as Portal from '@radix-ui/react-portal'
import { useState } from 'react'
interface CourseCurriculumProps {
	sections: SingleSectionProps[]
}

export default function CourseCurriculum({ sections }: CourseCurriculumProps) {
	const [showModal, setShowModal] = useState(false)
	return (
		<>
			<Accordion.Root type='multiple' className='w-full space-y-2' defaultValue={[sections[0]?.id]}>
				{sections.map(section => (
					<Accordion.Item
						key={section.id}
						value={section.id}
						className='border border-border rounded-lg overflow-hidden'>
						<Accordion.Header className='flex'>
							<Accordion.Trigger className='flex w-full justify-between items-center px-4 py-3 bg-background  font-semibold text-left transition'>
								<span>{section.title}</span>
								<div className='flex font-normal justify-start items-center gap-1'>
									<span className='text-sm text-muted-foreground'>{section.lessons.length} lessons</span>
									<ChevronDown className='h-5 w-5 transition-transform duration-200 AccordionChevron' />
								</div>
							</Accordion.Trigger>
						</Accordion.Header>

						<Accordion.Content className='bg-card text-sm px-4 py-2 space-y-2'>
							{section.lessons.map(lesson => (
								<div key={lesson.id} className='flex justify-between items-center border-b pb-2 pt-1'>
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
							))}
						</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion.Root>
			{showModal && (
				<Portal.Root>
					<div className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center'>
						<div className='bg-background w-full max-w-2xl h-96 rounded-lg shadow-lg p-6 relative'>
							<button onClick={() => setShowModal(false)} className='absolute top-4 right-4 text-black text-2xl'>
								×
							</button>
							<p className='text-lg font-semibold'>Modal</p>
						</div>
					</div>
				</Portal.Root>
			)}
		</>
	)
}
