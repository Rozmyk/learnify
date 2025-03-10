'use client'
import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import SingleSearchCourse from '@/components/SingleSearchCourse/SingleSearchCourse'
import useDebouncedSearch from '@/lib/useDebouncedSearch'

interface SearchOverlayProps {
	handleClose: () => void
}

const SearchOverlay = ({ handleClose }: SearchOverlayProps) => {
	const [inputValue, setInputValue] = useState('')
	const { courses, loading } = useDebouncedSearch(inputValue)

	return (
		<div className='fixed inset-0 bg-card z-50 flex flex-col '>
			<div className='flex items-center justify-center border-b border-border pb-2 gap-2 p-4'>
				<Search className='mr-2' />
				<Input
					value={inputValue}
					onChange={e => {
						setInputValue(e.target.value)
					}}
					placeholder='Search for any courses...'
				/>
				<Button size='icon' variant='ghost' onClick={handleClose}>
					<X />
				</Button>
			</div>

			{loading ? (
				<div className='flex justify-center items-center py-8'>
					<Loader />
				</div>
			) : (
				<div className='flex flex-col p-4'>
					{courses?.map(course => {
						return (
							<span onClick={handleClose} key={course.id}>
								<SingleSearchCourse course={course} />
							</span>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default SearchOverlay
