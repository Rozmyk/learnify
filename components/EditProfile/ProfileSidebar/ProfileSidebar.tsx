import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SetStateAction, Dispatch } from 'react'
import Link from 'next/link'

type CurrentType = 'setProfile' | 'setPhoto' | 'deleteAccount'

interface ProfileSidebarProps {
	avatarUrl: string
	username: string
	currentType: CurrentType
	setCurrentType: Dispatch<SetStateAction<CurrentType>>
}

const ProfileSidebar = ({ avatarUrl, username, currentType, setCurrentType }: ProfileSidebarProps) => {
	const buttonVariant = 'ghost'

	const buttons = [
		{ value: 'setProfile' as CurrentType, label: 'Profile' },
		{ value: 'setPhoto' as CurrentType, label: 'Photo' },
		{ value: 'deleteAccount' as CurrentType, label: 'Delete my account' },
	]

	return (
		<>
			<Image height={120} width={120} className='rounded-full mb-2' src={avatarUrl} alt='user Avatar' />
			<p className='text-lg font-semibold'>{username}</p>
			<div className='flex flex-col gap-2 w-full mt-4'>
				<Link className='w-full' href={`/profile/${username}`}>
					<Button className='w-full' variant={buttonVariant}>
						View my profile
					</Button>
				</Link>
				{buttons.map(btn => (
					<Button
						key={btn.value}
						onClick={() => setCurrentType(btn.value)}
						variant={currentType === btn.value ? 'default' : 'ghost'}>
						{btn.label}
					</Button>
				))}
			</div>
		</>
	)
}

export default ProfileSidebar
