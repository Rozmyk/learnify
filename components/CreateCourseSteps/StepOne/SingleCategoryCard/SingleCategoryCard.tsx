import { LucideIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
const SingleCategoryCard = ({
	value,
	description,
	Icon,
	selected,
	setSelected,
}: {
	value: string
	description: string
	Icon: LucideIcon
	selected: boolean
	setSelected: Dispatch<SetStateAction<string | null>>
}) => {
	return (
		<span
			onClick={() => {
				setSelected(value)
			}}>
			<div
				className={`w-56 h-72  border ${selected ? 'border-4' : 'border-1'} flex flex-col  justify-center items-center p-4 gap-4 ${selected ? 'border-primary' : 'border-border '} hover:bg-secondary cursor-pointer transition-colors `}>
				<Icon size={30} />
				<p className='font-semibold text-center'>{value}</p>
				<p className='text-sm text-muted-foreground text-center'>{description}</p>
			</div>
		</span>
	)
}

export default SingleCategoryCard
