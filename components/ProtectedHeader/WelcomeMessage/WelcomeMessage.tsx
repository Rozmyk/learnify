import Image from 'next/image'

const WelcomeMessage = ({ username, userPhoto }: { username: string; userPhoto: string }) => {
	return (
		<div className='flex justify-start items-center  gap-4 md:gap-8 mb-8'>
			<div className='w-12 h-12 md:h-20 md:w-20 relative'>
				<Image fill className='rounded-full' src={userPhoto} alt={`${username} user photo`} />
			</div>

			<h1 className=' text-xl md:text-3xl font-semibold'>Welcome back {username}!</h1>
		</div>
	)
}

export default WelcomeMessage
