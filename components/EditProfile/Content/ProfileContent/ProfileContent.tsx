import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ProfileDataProps } from '@/types/api'
const ProfileContent = ({ profileData }: { profileData: ProfileDataProps }) => {
	return (
		<div className='flex flex-col justify-start items-start w-full '>
			<Label className='mb-4'>Basic information</Label>
			<Input className='mb-4' placeholder='Username' defaultValue={profileData.username} />
			<Input className='mb-8' placeholder='Description' />
			<Label className='mb-4'>Links</Label>
			<Input className='mb-8' placeholder='Website' />
			<Button>Save</Button>
		</div>
	)
}

export default ProfileContent
