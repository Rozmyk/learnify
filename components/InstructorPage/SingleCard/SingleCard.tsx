import { LucideIcon } from 'lucide-react'

const SingleCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) => {
	return (
		<div className='border border-border h-72 w-96 flex flex-col justify-center items-center text-center p-8 hover:bg-secondary transition-all cursor-pointer'>
			<Icon size={30} />
			<h4 className='py-4 font-semibold text-lg'>{title}</h4>
			<p className='text-sm text-muted-foreground'>{description}</p>
		</div>
	)
}

export default SingleCard
