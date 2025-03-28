'use client'
import { useState } from 'react'
import { ProfileDataProps } from '@/types/api'
import ProfileSidebar from './ProfileSidebar/ProfileSidebar'
import EditProfileHeader from './EditProfileHeader/EditProfileHeader'
import ProfileContent from './Content/ProfileContent/ProfileContent'
import PhotoContent from './Content/PhotoContent/PhotoContent'
import DeleteContent from './Content/DeleteContent/DeleteContent'
type CurrentType = 'setProfile' | 'setPhoto' | 'deleteAccount'

const EditProfile = ({ profileData }: { profileData: ProfileDataProps }) => {
	const [currentType, setCurrentType] = useState<CurrentType>('setProfile')
	const { title, text, content } = (() => {
		switch (currentType) {
			case 'setProfile':
				return {
					title: 'Profile',
					text: 'Add information about yourself',
					content: <ProfileContent profileData={profileData} />,
				}
			case 'setPhoto':
				return {
					title: 'Photo',
					text: 'Add a relevant photo to your profile.',
					content: <PhotoContent profileData={profileData} />,
				}
			case 'deleteAccount':
				return { title: 'Close account', text: 'Close your account permanently.', content: <DeleteContent /> }
			default:
				return { title: '', text: '', content: <p>other data</p> }
		}
	})()

	return (
		<div className='w-full flex md:flex-row flex-col justify-center items-center gap-10 min-h-[calc(100vh-4rem)] p-2'>
			<div className='border border-border w-full rounded-xl flex md:flex-row flex-col justify-between items-stretch'>
				<div className='w-full md:w-1/5 flex flex-col justify-start items-center p-4   h-full'>
					<ProfileSidebar
						setCurrentType={setCurrentType}
						currentType={currentType}
						avatarUrl={profileData.avatar_url}
						username={profileData.username}
					/>
				</div>
				<div className='w-full md:w-4/5 flex flex-col justify-between items-center h-full border-l border-border'>
					<EditProfileHeader title={title} text={text} />
					<div className='py-4 px-4 md:px-24 w-full min-h-[450px] '>{content}</div>
				</div>
			</div>
		</div>
	)
}

export default EditProfile
