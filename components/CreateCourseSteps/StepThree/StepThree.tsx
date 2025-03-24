'use client'

import StepTitle from '../StepTitle/StepTitle'
import { useState, useEffect } from 'react'
import CategorySelect from '@/components/CategorySelect/CategorySelect'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'

const StepThree = () => {
	const { data, setData, completedSteps, setCompletedSteps } = useCreateCourseStore()

	const [category, setCategory] = useState<string | null>(data.categories_id ?? null)
	useEffect(() => {
		if (category && !completedSteps.includes('3')) {
			setCompletedSteps([...completedSteps, '3'])
		}
	}, [category])
	useEffect(() => {
		if (data.categories_id !== category && category) {
			setData({ categories_id: category })
		}
	}, [category, data.categories_id, setData])

	return (
		<div>
			<StepTitle
				title='What category best fits the knowledge you will share?'
				description='If you are not sure about a category, you can change it later.'
			/>
			<div className='w-full flex justify-center items-center'>
				<CategorySelect
					className='w-full max-w-96'
					selectedCategory={category}
					setSelectedCategory={setCategory}
					withoutLabel
				/>
			</div>
		</div>
	)
}

export default StepThree
