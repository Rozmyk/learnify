import { Star } from 'lucide-react'
import SingleAccordion from '../SingleAccordion/SingleAccordion'

const ratings = [
	{ rating: '4.5', count: 2451 },
	{ rating: '4.0', count: 5288 },
	{ rating: '3.5', count: 6028 },
	{ rating: '3.0', count: 6181 },
]

const Ranking = ({
	handleFilter,
	filters,
}: {
	handleFilter: (paramsToUpdate: Record<string, string>) => void
	filters: Record<string, string>
}) => {
	return (
		<SingleAccordion item='Ranking'>
			<div className='space-y-4'>
				{ratings.map((item, index) => (
					<div
						key={index}
						className='flex items-center gap-2 cursor-pointer select-none'
						onClick={() => handleFilter({ rating: item.rating })}>
						<div
							className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all border-primary`}>
							{filters.rating === item.rating && <div className='w-2 h-2 bg-primary rounded-full'></div>}
						</div>
						<div className='flex items-center gap-0.5'>
							{Array.from({ length: 5 }).map((_, starIndex) => (
								<Star
									key={starIndex}
									size={12}
									className={starIndex < item.rating ? 'text-orange-400 fill-orange-400' : 'text-muted-foreground'}
								/>
							))}
						</div>
						<span className='text-sm font-semibold '>{item.rating} and higher</span>
						<span className='text-xs text-muted-foreground'>({item.count})</span>
					</div>
				))}
			</div>
		</SingleAccordion>
	)
}

export default Ranking
