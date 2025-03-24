'use client'

import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import StepTitle from '../StepTitle/StepTitle'
import { useState, useEffect } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Check } from 'lucide-react'
import { TimeCommitment } from '@/types/api'

interface optionsProps {
	value: TimeCommitment
	label: string
}

const options: optionsProps[] = [
	{
		value: '0-2',
		label: 'I am very busy (0–2 hours)',
	},
	{
		value: '2-4',
		label: 'I will work on it on the side (2–4 hours)',
	},
	{
		value: '5+',
		label: 'I am very flexible (5 hours or more)',
	},
	{
		value: 'undecided',
		label: "I haven't decided yet whether I have the time",
	},
]

const StepFour = () => {
	const { data, setData, completedSteps, setCompletedSteps } = useCreateCourseStore()

	const [value, setValue] = useState<TimeCommitment>(data.time_commitment ?? 'undecided')

	useEffect(() => {
		if (value) {
			setData({ time_commitment: value })
			if (!completedSteps.includes('4')) {
				setCompletedSteps([...completedSteps, '4'])
			}
		}
	}, [value, completedSteps, setData, setCompletedSteps])

	return (
		<>
			<StepTitle
				description="There are no wrong answers. We will help you achieve your goals, even when you don't have much time."
				title='How much time can you devote per week to creating a course?'
			/>
			<div className='w-full flex justify-center items-center'>
				<RadioGroup.Root
					className='flex flex-col gap-4 max-w-96 w-full'
					value={value}
					onValueChange={(newValue: string) => setValue(newValue as TimeCommitment)}>
					{options.map(option => (
						<RadioGroup.Item
							key={option.value}
							value={option.value}
							className='group relative flex items-center gap-2 rounded-md border border-input px-4 py-2 text-sm cursor-pointer 
							data-[state=checked]:bg-secondary data-[state=checked]:text-white transition'>
							<span>{option.label}</span>
							<RadioGroup.Indicator className='absolute right-3'>
								<Check className='w-4 h-4' />
							</RadioGroup.Indicator>
						</RadioGroup.Item>
					))}
				</RadioGroup.Root>
			</div>
		</>
	)
}

export default StepFour
