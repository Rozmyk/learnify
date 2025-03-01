'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useState, useEffect } from 'react'
import { Button } from '../../button'
import { useOwnedCoursesStore } from '@/context/ownedCourses'
import Loader from '../../loader'
import SingleOwnedCourse from './SingleOwnedCourse/SingleOwnedCourse'
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
					<div className='flex justify-center items-center w-full'>
						<Loader />
					</div>
				) : (
					<>
						<ScrollArea.Root>
							<ScrollArea.Viewport style={{ maxHeight: 500 }}>
								<ScrollArea.Scrollbar orientation='vertical'>
									<ScrollArea.Thumb />
								</ScrollArea.Scrollbar>
								<div className='p-4 flex flex-col justify-start items-start max-w-80 gap-4'>
									{owned.map(item => {
										return <SingleOwnedCourse {...item.course} key={item.course.id} />
									})}
								</div>
							</ScrollArea.Viewport>
						</ScrollArea.Root>
						<div className='w-full border-t border-border my-2'></div>
					</>
				)}
				<div className='w-full p-2 flex flex-col justify-center items-start gap-2'>
					<Button className='w-full'>Open my courses</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default MyCoursesButton
