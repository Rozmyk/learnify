'use client'
import { Search, X } from 'lucide-react'
import { useEffect } from 'react'

interface SearchOverlayProps {
	handleClose: () => void
}

const SearchOverlay = ({ handleClose }: SearchOverlayProps) => {
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
		<div className='fixed inset-0 bg-card z-50 flex flex-col p-4'>
			<div className='flex items-center border-b border-gray-300 pb-2'>
				<Search className='mr-2' />
				<input
					type='text'
					placeholder='Szukaj dowolnych elementów'
					className='w-full outline-none bg-transparent'
					autoFocus
				/>
				<button onClick={handleClose}>
					<X />
				</button>
			</div>

			<div className='flex-1 mt-4'>Tu będą wyniki wyszukiwania...</div>
		</div>
	)
}

export default SearchOverlay
