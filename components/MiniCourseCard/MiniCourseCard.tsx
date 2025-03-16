import { CourseProps } from '@/types/api'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
interface MiniCourseCardProps extends CourseProps {
	withoutButton?: boolean
	onClick?: () => void
}
const MiniCourseCard = ({
	title,
	profiles,
	thumbnail,
	price,
	discount,
	slug,
	withoutButton,
	onClick,
}: MiniCourseCardProps) => {
	return (
		<div className='flex flex-col justify-start items-start w-full'>
			<Link href={`/course/${slug}`} className='flex justify-start items-center gap-4'>
				<div className='relative w-16 min-w-16 min-h-16 h-16 aspect-w-1 aspect-h-1 rounded-md overflow-hidden'>
					<Image src={thumbnail} fill alt='course photo' className='object-cover' />
				</div>

				<div className='flex flex-col '>
					<h4 className='text-sm font-semibold'>{title}</h4>
					<p className='text-sm text-muted-foreground'>{profiles.username}</p>
					<div className='flex justify-start items-center gap-2 mt-2 '>
						{discount && discount > 0 && (
							<p className='text-sm font-semibold '>{(price * (1 - discount / 100)).toFixed(2)} zł</p>
						)}

						<p
							className={`${discount && discount > 0 ? 'line-through text-muted-foreground text-sm' : 'text-sm font-semibold'}`}>
							{price} zł
						</p>
					</div>
				</div>
			</Link>
			{!withoutButton && (
				<Button variant='outline' size='sm' className='w-full mt-2' onClick={onClick}>
					Add to cart
				</Button>
			)}
		</div>
	)
}

export default MiniCourseCard
