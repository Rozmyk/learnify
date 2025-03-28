import Link from 'next/link'
import { Check } from 'lucide-react'
interface SingleItemProps {
	text: string
	active: boolean
	href: string
	complete: boolean
}

const SingleItem = ({ text, active, href, complete }: SingleItemProps) => {
	return (
		<Link href={href}>
			<div
				className={`${
					active ? 'border-l-primary' : 'border-l-transparent'
				} flex justify-start items-center gap-2 border-l-4 w-full py-2 px-4 hover:bg-secondary cursor-pointer`}>
				<div className='w-5 h-5 flex justify-center items-center rounded-full border-2 border-border'>
					{complete && <Check size={12} />}
				</div>
				<p>{text}</p>
			</div>
		</Link>
	)
}

export default SingleItem
