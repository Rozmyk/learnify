import Link from 'next/link'
import Image from 'next/image'
import Loader from './loader'
import { CourseProps } from '@/types/api'
const CaourseCard = ({ thumbnail, title, price, description }: CourseProps) => {
	return (
		<Link href={''} prefetch={false} className='group hover:no-underline flex'>
			<div className='bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] border border-border flex flex-col flex-1'>
				<div className='relative h-52 w-full overflow-hidden'>
					{thumbnail ? (
						<Image
							src={thumbnail}
							alt={title || 'Course Image'}
							fill
							className='object-cover transition-transform duration-300 group-hover:scale-110'
						/>
					) : (
						<div className='h-full w-full flex items-center justify-center bg-muted'>
							<Loader />
						</div>
					)}
					<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
					<div className='absolute bottom-4 left-4 right-4 flex items-center justify-between'>
						<span className='text-sm font-medium px-3 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm'>
							{'Uncategorized'}
						</span>
					</div>
				</div>
				<div className='p-6 flex flex-col flex-1'>
					<h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>{title}</h3>
					<p className='text-muted-foreground mb-4 line-clamp-2 flex-1'>{description}</p>
					<div className='space-y-4 mt-auto'></div>
				</div>
			</div>
		</Link>
	)
}

export default CaourseCard
