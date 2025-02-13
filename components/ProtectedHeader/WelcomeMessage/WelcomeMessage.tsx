import Image from 'next/image'

const WelcomeMessage = ({ username, userPhoto }: { username: string; userPhoto: string }) => {
	return (
		<div className='flex justify-start items-center gap-8 mb-8'>
			<Image width={75} height={75} className='rounded-full' src={userPhoto} alt={`${username} user photo`} />
			<h1 className='text-3xl font-semibold'>Welcome back {username}!</h1>
		</div>
	)
}

export default WelcomeMessage
