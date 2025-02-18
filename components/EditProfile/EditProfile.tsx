'use client'
import { useState } from 'react'
import { ProfileDataProps } from '@/types/api'
import ProfileSidebar from './ProfileSidebar/ProfileSidebar'
import EditProfileHeader from './EditProfileHeader/EditProfileHeader'
const EditProfile = ({ profileData }: { profileData: ProfileDataProps }) => {
	const [currentType, setCurrentType] = useState('setProfile')
	const dataToRender = (() => {
		switch (currentType) {
			case 'setProfile':
				return <p>profile</p>
			case 'setPhoto':
				return <p>photo</p>
			case 'deleteAccount':
				return <p>delete aacount</p>
			default:
				return <p>other data</p>
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
					<EditProfileHeader />
					{dataToRender}
				</div>
			</div>
		</div>
	)
}

export default EditProfile
