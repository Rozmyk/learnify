'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { ProfileDataProps } from '@/types/api'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const PhotoContent = ({ profileData }: { profileData: ProfileDataProps }) => {
	const [newImageFile, setNewImageFile] = useState<null | File>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [succes, setSucces] = useState(false)
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null
		setNewImageFile(file)

		if (file) {
			const objectUrl = URL.createObjectURL(file)
			setPreviewUrl(objectUrl)
		} else {
			setPreviewUrl(null)
		}
	}
	const handleSubmit = async () => {
		if (newImageFile) {
			setLoading(true)

			const formData = new FormData()
			formData.append('avatar', newImageFile)

			try {
				const res = await fetch('/api/update_avatar', {
					method: 'POST',
					body: formData,
				})

				const data = await res.json()
				if (data) {
					setSucces(true)
					setNewImageFile(null)
				}
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<div className='flex flex-col justify-start items-start w-full '>
			<Label className='mb-4 '>Image preview</Label>

			<div className='w-full flex justify-center items-center'>
				<div className='w-40 h-40 relative rounded-full overflow-hidden mb-8'>
					<Image fill src={previewUrl || profileData.avatar_url} alt='user profile photo' />
				</div>
			</div>
			<Label className='mb-4 '>Add/change image</Label>
			<Input className='mb-8' onChange={handleImageChange} accept='image/*' type='file' />
			{error && <p>{error}</p>}
			{succes && <p className='mb-4'>Successfully changed photo</p>}
			<Button disabled={!newImageFile} onClick={handleSubmit}>
				{loading ? 'Loading' : 'Save'}
			</Button>
		</div>
	)
}

export default PhotoContent
