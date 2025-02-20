'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ProfileDataProps } from '@/types/api'

const ProfileContent = ({ profileData }: { profileData: ProfileDataProps }) => {
	const [usernameValue, setUsernameValue] = useState(profileData.username || '')
	const [descriptionValue, setDescriptionValue] = useState(profileData.description || '')
	const [websiteValue, setWebsiteValue] = useState(profileData.website || '')
	const [statusMessage, setStatusMessage] = useState('')

	const updateProfile = async () => {
		try {
			const response = await fetch('/api/update-username', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: usernameValue,
					description: descriptionValue,
					website: websiteValue,
				}),
			})
			const data = await response.json()
			if (!response.ok) {
				setStatusMessage(data.error || 'Failed to update profile')
			} else {
				setStatusMessage('Profile updated successfully')
			}
		} catch (error) {
			setStatusMessage('Something went wrong while updating profile')
		}
	}

	return (
		<div className='flex flex-col justify-start items-start w-full '>
			<Label className='mb-4'>Basic information</Label>
			<Input
				className='mb-2'
				value={usernameValue}
				onChange={e => setUsernameValue(e.target.value)}
				placeholder='Username'
			/>
			<Input
				className='mb-8'
				value={descriptionValue}
				onChange={e => setDescriptionValue(e.target.value)}
				placeholder='Description'
			/>
			<Label className='mb-4'>Links</Label>
			<Input
				value={websiteValue}
				onChange={e => setWebsiteValue(e.target.value)}
				className='mb-8'
				placeholder='Website'
			/>
			{statusMessage && <p className='mb-4 text-sm '>{statusMessage}</p>}
			<Button onClick={updateProfile}>Save</Button>
		</div>
	)
}

export default ProfileContent
