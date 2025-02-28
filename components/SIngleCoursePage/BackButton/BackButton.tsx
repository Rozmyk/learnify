import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
const BackButton = () => {
	return (
		<Link
			className='absolute top-4 left-4 z-20 cursor-pointer font-semibold text-sm flex justify-start items-center gap-2'
			href='/'>
			<ArrowLeft size={16} />
			Back to courses
		</Link>
	)
}

export default BackButton
