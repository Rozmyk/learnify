'use client'

import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import StepTitle from '../StepTitle/StepTitle'
import { useState, useEffect } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Check } from 'lucide-react'
import { TimeCommitmentProps } from '@/types/api'
import Loader from '@/components/ui/loader'

const StepFour = () => {
	const { data, setData, completedSteps, setCompletedSteps } = useCreateCourseStore()
	const [timesCommited, setTimesCommited] = useState<TimeCommitmentProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchLevels = async () => {
			try {
				const response = await fetch('/api/times_commited')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()

				setTimesCommited(data.times_commited)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
		fetchLevels()
	}, [])
	const [value, setValue] = useState<string | undefined>(data.times_commited_id ?? undefined)

	useEffect(() => {
		if (value) {
			setData({ times_commited_id: value })
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
			{loading ? (
				<div className='flex justify-center items-center w-full h-full py-10'>
					<Loader />
				</div>
			) : (
				<div className='w-full flex justify-center items-center'>
					<RadioGroup.Root
						className='flex flex-col gap-4 max-w-96 w-full'
						value={value}
						onValueChange={(newValue: string) => setValue(newValue)}>
						{timesCommited?.map(option => (
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
			)}
		</>
	)
}

export default StepFour
