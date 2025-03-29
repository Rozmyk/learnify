import Link from 'next/link'
import { Brain } from 'lucide-react'
const HomeButton = ({ compact }: { compact?: boolean }) => {
	return (
		<div className='flex gap-5 items-center font-semibold '>
			<Link className='text-xl flex justify-center items-center gap-2' href={'/'}>
				<Brain size={20} />
				{!compact && 'Learnify'}
			</Link>
		</div>
	)
}

export default HomeButton
