'use client'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
const StepTwo = () => {
	const [inputValue, setInputValue] = useState('')

	return (
		<div className='text-center'>
			<h1 className='text-4xl font-semibold mb-8'>How about a working title?</h1>
			<p className='mb-10'>If you can't come up with a good title, no problem. You can change it later.</p>
			<div className='flex gap-4 justify-start items-center'>
				<Input
					value={inputValue}
					onChange={e => {
						const newValue = e.target.value
						if (newValue.length <= 60 || newValue.length < inputValue.length) {
							setInputValue(newValue)
						}
					}}
					placeholder='e.g. Basics of using photoshop CS6'
				/>

				<div className='min-w-20'>
					<p className='font-semibold'>{inputValue.length}/60</p>
				</div>
			</div>
		</div>
	)
}

export default StepTwo
