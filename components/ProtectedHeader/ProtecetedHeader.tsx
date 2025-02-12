import Link from 'next/link'
import WelcomeMessage from './WelcomeMessage/WelcomeMessage'
const ProtectedHeader = () => {
	return (
		<div>
			<WelcomeMessage username='Rozmyk' userPhoto='' />
			<div className='flex justify-between items-center w-full'>
				<p>Start learning</p>
				<Link href={'/courses'}>Your courses</Link>
			</div>
		</div>
	)
}

export default ProtectedHeader
