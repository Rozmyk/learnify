import { LucideIcon } from 'lucide-react'

const SingleFeature = ({ Icon, value }: { Icon: LucideIcon; value: string }) => {
	return (
		<div className='flex justify-start items-center gap-4'>
			<div>
				<Icon size={16} />
			</div>
			<p>{value}</p>
		</div>
	)
}

export default SingleFeature
