import Link from 'next/link'
const HomeButton = () => {
	return (
		<div className='flex gap-5 items-center font-semibold '>
			<Link className='text-xl' href={'/'}>
				Learnify
			</Link>
		</div>
	)
}

export default HomeButton
