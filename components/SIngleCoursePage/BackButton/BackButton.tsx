import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
const BackButton = () => {
	return (
		<Link className='absolute top-4 left-4 z-20 cursor-pointer font-semibold flex gap-2' href='/'>
			<ArrowLeft />
			Back to course
		</Link>
	)
}

export default BackButton
