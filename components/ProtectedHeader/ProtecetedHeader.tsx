import WelcomeMessage from './WelcomeMessage/WelcomeMessage'
import { ProfileDataProps } from '@/types/api'
const ProtectedHeader = ({ profileData }: { profileData: ProfileDataProps }) => {
	return (
		<div>
			<WelcomeMessage username={profileData.username} userPhoto={profileData.avatar_url} />
		</div>
	)
}

export default ProtectedHeader
