'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../../button'
import { useOwnedCoursesStore } from '@/context/ownedCourses'
import Loader from '../../loader'
const MyCoursesButton = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { fetchOwned, owned, loading, hasFetchedOwnedCourses } = useOwnedCoursesStore()
	const handleOpen = () => {
		setIsOpen(true)
	}
	useEffect(() => {
		if (!hasFetchedOwnedCourses) {
			fetchOwned()
		}
	}, [])
	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild onClick={handleOpen}>
				<Button variant={'ghost'}>My courses</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content ' align='start'>
				{loading ? (
					<Loader />
				) : (
					owned.map(item => {
						return <p>{item.course.title}</p>
					})
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default MyCoursesButton
