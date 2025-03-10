'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, X } from 'lucide-react'
import { SingleSectionProps } from '@/types/api'
import SingleLesson from './SingleLesson/SingleLesson'

interface CourseCurriculumProps {
	sections: SingleSectionProps[]
}

export default function CourseCurriculum({ sections }: CourseCurriculumProps) {
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
								<SingleLesson lesson={lesson} key={lesson.id} />
							))}
						</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion.Root>
		</>
	)
}
