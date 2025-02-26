import { LucideIcon } from 'lucide-react'

const SingleFeature = ({ Icon, value }: { Icon: LucideIcon; value: string }) => {
	return (
		<div className='flex justify-start items-center gap-4 mb-1'>
			<div>
				<Icon size={16} />
			</div>
			<p className='text-sm text-muted-foreground'>{value}</p>
		</div>
	)
}

export default SingleFeature
