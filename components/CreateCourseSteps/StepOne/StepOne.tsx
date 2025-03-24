'use client'
import { useEffect, useState } from 'react'
import { LucideIcon, Monitor, NotepadText } from 'lucide-react'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import SingleCategoryCard from './SingleCategoryCard/SingleCategoryCard'

import StepTitle from '../StepTitle/StepTitle'
interface categoriesProps {
	value: 'course' | 'practice'
	text: string
	description: string
	Icon: LucideIcon
}

const categoriesArray: categoriesProps[] = [
	{
		value: 'course',
		text: 'Course',
		description: 'Create engaging courses with video lectures, tests, coding exercises, and more.',
		Icon: Monitor,
	},
	{
		value: 'practice',
		text: 'Practice test',
		description: 'Help course participants prepare for certification exams by creating practice questions.',
		Icon: NotepadText,
	},
]

const StepOne = () => {
	const { setData, data, completedSteps, setCompletedSteps } = useCreateCourseStore()
	const [selected, setSelected] = useState<string | null>(data.type ?? null)

	const handleCategoryClick = (value: 'practice' | 'course') => {
		setData({ type: value })
		setSelected(value)
	}
	useEffect(() => {
		if (selected && !completedSteps.includes('1')) {
			setCompletedSteps([...completedSteps, '1'])
		}
	}, [selected])

	return (
		<>
			<StepTitle title="First, let's find out what kind of course you are creating." />

			<div className='flex justify-center items-center gap-4 py-8'>
				{categoriesArray.map(item => (
					<SingleCategoryCard
						key={item.value}
						value={item.value}
						text={item.text}
						description={item.description}
						Icon={item.Icon}
						onClick={() => handleCategoryClick(item.value)}
						selected={item.value === selected}
					/>
				))}
			</div>
		</>
	)
}

export default StepOne
