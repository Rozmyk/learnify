import { LucideIcon } from 'lucide-react'

const SingleCategoryCard = ({
	value,
	text,
	description,
	Icon,
	selected,
	onClick,
}: {
	value: 'course' | 'practice'
	text: string
	description: string
	onClick: (value: 'course' | 'practice') => void
	Icon: LucideIcon
	selected: boolean
}) => {
	return (
		<span onClick={() => onClick(value)}>
			<div
				className={`w-56 h-72 border ${selected ? 'border-4' : 'border-1'} flex flex-col justify-center items-center p-4 gap-4 ${selected ? 'border-primary' : 'border-border '} hover:bg-secondary cursor-pointer transition-colors`}>
				<Icon size={30} />
				<p className='font-semibold text-center'>{text}</p>
				<p className='text-sm text-muted-foreground text-center'>{description}</p>
			</div>
		</span>
	)
}

export default SingleCategoryCard
