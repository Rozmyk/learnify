import Link from 'next/link'

const ProtectedHeader = () => {
	return (
		<div>
			<h1 className='text-4xl font-medium'>Welcome back Rozmyk!</h1>
			<div className='flex justify-between items-center w-full'>
				<p>Start learning</p>
				<Link href={'/courses'}>Your courses</Link>
			</div>
		</div>
	)
}

export default ProtectedHeader
