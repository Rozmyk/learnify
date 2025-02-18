'use client'
import { useState } from 'react'
import { ProfileDataProps } from '@/types/api'
import ProfileSidebar from './ProfileSidebar/ProfileSidebar'
import EditProfileHeader from './EditProfileHeader/EditProfileHeader'
import ProfileContent from './Content/ProfileContent/ProfileContent'
const EditProfile = ({ profileData }: { profileData: ProfileDataProps }) => {
	const [currentType, setCurrentType] = useState('setProfile')
	const { title, text, content } = (() => {
		switch (currentType) {
			case 'setProfile':
				return { title: 'Profile', text: 'Add information about yourself', content: <ProfileContent /> }
			case 'setPhoto':
				return { title: 'Photo', text: 'Add a relevant photo to your profile.', content: <p>photo</p> }
			case 'deleteAccount':
				return { title: 'Close account', text: 'Close your account permanently.', content: <p>delete account</p> }
			default:
				return { title: '', text: '', content: <p>other data</p> }
		}
	})()

	return (
		<div className='w-full flex md:flex-row flex-col justify-center items-center gap-10 h-[calc(100vh-4rem)] p-2'>
			<div className='border border-border  w-full  rounded-xl flex justify-between items-start'>
				<div className='w-1/5 flex flex-col justify-start items-center p-4 border-r border-border '>
					<ProfileSidebar
						setCurrentType={setCurrentType}
						currentType={currentType}
						avatarUrl={profileData.avatar_url}
						username={profileData.username}
					/>
				</div>
				<div className='w-4/5 flex flex-col justify-between items-center h-full  '>
					<EditProfileHeader title={title} text={text} />
					<div className='p-4'>{content}</div>
				</div>
			</div>
		</div>
	)
}

export default EditProfile
