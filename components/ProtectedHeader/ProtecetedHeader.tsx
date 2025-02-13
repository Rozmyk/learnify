import Link from 'next/link'
import WelcomeMessage from './WelcomeMessage/WelcomeMessage'
import { ProfileDataProps } from '@/types/api'
const ProtectedHeader = ({ profileData }: { profileData: ProfileDataProps }) => {
	return (
		<div>
			<WelcomeMessage username={profileData.username} userPhoto={profileData.avatar_url} />
			<div className='flex justify-between items-center w-full'>
				<p>Start learning</p>
				<Link href={'/courses'}>Your courses:</Link>
			</div>
		</div>
	)
}

export default ProtectedHeader
