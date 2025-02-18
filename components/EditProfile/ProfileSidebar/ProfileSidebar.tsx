import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SetStateAction, Dispatch } from 'react'
const ProfileSidebar = ({
	avatarUrl,
	username,
	currentType,
	setCurrentType,
}: {
	avatarUrl: string
	username: string
	currentType: string
	setCurrentType: Dispatch<SetStateAction<string>>
}) => {
	const buttonVariant = 'ghost'
	const handleClick = (value: string) => {
		setCurrentType(value)
	}
	return (
		<>
			<Image height={120} width={120} className='rounded-full mb-2' src={avatarUrl} alt='user Avatar' />
			<p className=' text-lg font-semibold'>{username}</p>
			<div className='flex flex-col gap-2  w-full mt-4'>
				<Button variant={buttonVariant}>View my profile</Button>
				<Button
					onClick={() => {
						handleClick('setProfile')
					}}
					variant={currentType == 'setProfile' ? 'default' : 'ghost'}>
					Profile
				</Button>
				<Button
					onClick={() => {
						handleClick('setPhoto')
					}}
					variant={currentType == 'setPhoto' ? 'default' : 'ghost'}>
					Photo
				</Button>
				<Button
					onClick={() => {
						handleClick('deleteAccount')
					}}
					variant={currentType == 'deleteAccount' ? 'default' : 'ghost'}>
					Delete my account
				</Button>
			</div>
		</>
	)
}

export default ProfileSidebar
