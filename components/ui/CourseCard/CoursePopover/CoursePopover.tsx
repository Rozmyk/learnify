import { CircleAlert } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../../button'
import formatTimestamp from '@/lib/formatTimestamp'
import SingleLessonPoint from '@/components/SingleLessonPoint/SingleLessonPoint'
import FavButton from '@/components/FavButton/FavButton'
const CoursePopover = ({
	skills_gained,
	created_at,
	title,
	subtitle,
	id,
	level,
	isAlreadOwned,
	isAlreadInCart,
	addToCart,
	slug,
}: {
	skills_gained: string
	created_at: string
	title: string
	subtitle: string
	id: string
	level: string
	isAlreadOwned: boolean
	isAlreadInCart: boolean
	slug: string
	addToCart: (id: string) => void
}) => {
	const splitStringToArray = (text: string) => {
		if (!text) return []
		return text
			.split(';')
			.map(sentence => sentence.trim())
			.filter(sentence => sentence.length > 0)
			.slice(0, 3)
	}
	const skillsArray = splitStringToArray(skills_gained)
	return (
		<>
			{isAlreadOwned ? (
				<div className='flex flex-col gap-4 '>
					<div className='flex justify-start items-center gap-4'>
						<CircleAlert />
						<p className='text-muted-foreground text-sm '>
							You have been attending this course since {formatTimestamp(created_at)}
						</p>
					</div>
					<Link className='w-full' href={`/course/${slug}`}>
						<Button className='w-full'>Go to course</Button>
					</Link>
				</div>
			) : (
				<>
					<h3 className='text-lg font-semibold mb-2'>{title}</h3>
					<div className='flex justify-start items-center gap-2'>
						{' '}
						<p className='text-green-300 text-xs'>Updated: {formatTimestamp(created_at)}</p>
						<p className='text-xs text-muted-foreground capitalize'>Level: {level}</p>
					</div>
					<p className='text-sm  mt-2 mb-4'>{subtitle}</p>
					<div className='flex flex-col gap-2 mb-2'>
						{skillsArray?.map(item => {
							return <SingleLessonPoint key={item} value={item} />
						})}
					</div>
					<div className='flex justify-between items-center gap-4'>
						{isAlreadInCart ? (
							<Link className='w-full' href='/cart'>
								<Button className='w-full'>Go to cart</Button>
							</Link>
						) : (
							<Button
								className='w-full'
								onClick={() => {
									addToCart(id)
								}}>
								Add to cart
							</Button>
						)}

						<div className='w-10'>
							<FavButton courseId={id} />
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default CoursePopover
