'use client'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import StepTitle from '../StepTitle/StepTitle'

const StepTwo = () => {
	const { data, setData, completedSteps, setCompletedSteps } = useCreateCourseStore()
	let inputValue = data.title ?? ''
	useEffect(() => {
		if (inputValue && !completedSteps.includes('2')) {
			setCompletedSteps([...completedSteps, '2'])
		}
	}, [inputValue])

	return (
		<div className='text-center'>
			<StepTitle
				description="If you can't come up with a good title, no problem. You can change it later."
				title='How about a working title?'
			/>

			<div className='flex gap-4 justify-start items-center'>
				<Input
					value={inputValue}
					onChange={e => {
						const newValue = e.target.value
						if (newValue.length <= 60 || newValue.length < inputValue.length) {
							setData({ title: newValue })
						}
					}}
					placeholder='e.g. Basics of using photoshop CS6'
				/>

				<div className='min-w-20'>
					<p className='font-semibold text-sm'>{inputValue.length}/60</p>
				</div>
			</div>
		</div>
	)
}

export default StepTwo
