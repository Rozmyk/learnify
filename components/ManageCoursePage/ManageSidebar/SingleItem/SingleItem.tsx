import Link from 'next/link'
interface SingleItemProps {
	text: string
	active: boolean
	href: string
}

const SingleItem = ({ text, active, href }: SingleItemProps) => {
	return (
		<Link href={href}>
			<div
				className={`${
					active ? 'border-l-primary' : 'border-l-transparent'
				} flex justify-start items-center gap-2 border-l-4 w-full py-2 px-4 hover:bg-secondary cursor-pointer`}>
				<div className='w-5 h-5 rounded-full border-2 border-border'></div>
				<p>{text}</p>
			</div>
		</Link>
	)
}

export default SingleItem
