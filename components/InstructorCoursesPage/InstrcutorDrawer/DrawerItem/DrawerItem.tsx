import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

const DrawerItem = ({
	text,
	icon: Icon,
	href,
	hidden,
	active,
}: {
	text: string
	icon: LucideIcon
	href: string
	hidden: boolean
	active: boolean
}) => {
	return (
		<Link href={href} className='w-full'>
			<div
				className={`w-full hover:bg-secondary flex items-center gap-8 border-l-4 py-6 px-2 ${
					active ? 'border-l-primary' : 'border-l-transparent'
				}`}>
				<div className='min-w-[20px] flex justify-center'>
					<Icon size={20} />
				</div>

				<p
					className={`
						transition-all duration-300 text-sm
						${hidden ? 'opacity-0 max-w-0 scale-95' : 'opacity-100 max-w-[200px] scale-100'}
						overflow-hidden whitespace-nowrap capitalize font-semibold
					`}>
					{text}
				</p>
			</div>
		</Link>
	)
}

export default DrawerItem
