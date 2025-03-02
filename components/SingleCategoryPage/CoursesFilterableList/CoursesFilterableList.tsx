'use client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Select } from '@radix-ui/react-select'

const CoursesFilterableList = () => {
	const [fullWidth, setFullWidth] = useState(true)

	return (
		<>
			<div className='flex w-full justify-between items-center'>
				<div>
					<Button
						onClick={() => {
							setFullWidth(!fullWidth)
						}}>
						FIltruj
					</Button>
					<Select />
				</div>
				<p className='font-semibold'>1000 results</p>
			</div>
			<div className='flex justify-between items-start mb-96'>
				<div
					className={`bg-red-400 overflow-hidden transition-all duration-500 ${
						fullWidth ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
					}`}>
					<p>siema</p>
				</div>
				<div className={`transition-all bg-blue-300 duration-500 ${!fullWidth ? 'w-full' : 'md:w-3/4'}`}>
					<p>testarorassa</p>
				</div>
			</div>
		</>
	)
}

export default CoursesFilterableList
