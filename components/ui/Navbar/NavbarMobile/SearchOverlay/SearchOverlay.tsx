'use client'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CourseProps } from '@/types/api'
import Loader from '@/components/ui/loader'

interface SearchOverlayProps {
	handleClose: () => void
}

const SearchOverlay = ({ handleClose }: SearchOverlayProps) => {
	const [inputValue, setInputValue] = useState('')
	const [courses, setCourses] = useState<CourseProps | null>(null)
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose()
			}
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [handleClose])

	return (
		<div className='fixed inset-0 bg-card z-50 flex flex-col '>
			<div className='flex items-center justify-center border-b border-border pb-2 gap-2 p-4'>
				<Search className='mr-2' />
				<Input placeholder='Search for any courses...' />
				<Button size='icon' variant='ghost' onClick={handleClose}>
					<X />
				</Button>
			</div>

			<div className='flex-1  p-4 text-muted-foreground'>Here will be the search results...</div>
		</div>
	)
}

export default SearchOverlay
