import Image from 'next/image'

const WelcomeMessage = ({ username, userPhoto }: { username: string; userPhoto: string }) => {
	return (
		<div>
			<Image width={100} height={100} className='rounded-full' src={userPhoto} alt={`${username} user photo`} />
			<h1 className='text-3xl font-semibold'>Welcome back {username}!</h1>
		</div>
	)
}

export default WelcomeMessage
