import { Heart } from 'lucide-react'
import { Button } from '../../button'
import { fetchFavoriteCourses } from '@/lib/fetchFavouriteCourses'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import SingleFavCourse from './SingleFavCourse/SingleFavCourse'

const FavCoursesButton = async ({ userId }: { userId: string }) => {
	const { data, error } = await fetchFavoriteCourses(userId)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='icon' variant='ghost'>
					<Heart className={'text-muted-foreground'} size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content ' align='start'>
				<div className='p-4 flex flex-col justify-start items-start max-w-80 gap-4'>
					{data?.map(course => {
						return <SingleFavCourse {...course} />
					})}
				</div>
				<div className='w-full border-t border-border my-2'></div>
				<div className='w-full p-2'>
					<Button className='w-full'>Go to wishlist</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default FavCoursesButton
