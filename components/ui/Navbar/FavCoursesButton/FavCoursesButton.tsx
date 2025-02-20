import { Heart } from 'lucide-react'
import { Button } from '../../button'
import { fetchFavoriteCourses } from '@/lib/fetchFavouriteCourses'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const FavCoursesButton = async ({ userId }: { userId: string }) => {
	const { data, error } = await fetchFavoriteCourses(userId)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='icon' variant='ghost'>
					<Heart className={'text-muted-foreground'} size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-content' align='start'>
				{data?.map(course => {
					return <div>{course.title}</div>
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default FavCoursesButton
