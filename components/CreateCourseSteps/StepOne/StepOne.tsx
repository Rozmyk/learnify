'use client'
import { useState } from 'react'
import { Monitor, NotepadText } from 'lucide-react'
import SingleCategoryCard from './SingleCategoryCard/SingleCategoryCard'
const categoriesArray = [
	{
		value: 'Course',
		description: 'Create engaging courses with video lectures, tests, coding exercises, and more.',
		Icon: Monitor,
	},
	{
		value: 'Practice test',
		description: 'Help course participants prepare for certification exams by creating practice questions.',
		Icon: NotepadText,
	},
]
const StepOne = () => {
	const [selected, setSelected] = useState<string | null>(null)
	return (
		<>
			<h1 className='text-4xl font-semibold'>First, let's find out what kind of course you are creating.</h1>
			<div className='flex justify-center items-center gap-4 py-8'>
				{categoriesArray.map(item => {
					return <SingleCategoryCard setSelected={setSelected} selected={item.value == selected} {...item} />
				})}
			</div>
		</>
	)
}

export default StepOne
