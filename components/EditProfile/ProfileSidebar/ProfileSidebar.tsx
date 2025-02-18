import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SetStateAction, Dispatch } from 'react'
import Link from 'next/link'
type CurrentType = 'setProfile' | 'setPhoto' | 'deleteAccount'

const ProfileSidebar = ({
	avatarUrl,
	username,
	currentType,
	setCurrentType,
}: {
	avatarUrl: string
	username: string
	currentType: CurrentType
	setCurrentType: Dispatch<SetStateAction<CurrentType>>
}) => {
	const buttonVariant = 'ghost'
	const handleClick = (value: CurrentType) => {
		setCurrentType(value)
	}
	return (
		<>
			<Image height={120} width={120} className='rounded-full mb-2' src={avatarUrl} alt='user Avatar' />
			<p className=' text-lg font-semibold'>{username}</p>
			<div className='flex flex-col gap-2  w-full mt-4'>
				<Link className='w-full' href={`/profile/${username}`}>
					<Button variant={buttonVariant}>View my profile</Button>
				</Link>
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
