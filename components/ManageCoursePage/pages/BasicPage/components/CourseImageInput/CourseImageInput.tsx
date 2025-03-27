'use client'

import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { BookOpenText } from 'lucide-react'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/lib/getCroppedImg'
import { Button } from '@/components/ui/button'
import { Area } from 'react-easy-crop/types'

const CourseImageInput = ({ courseId, courseImage }: { courseId: string; courseImage: string }) => {
	const [imageSrc, setImageSrc] = useState<string | null>(null)
	const [croppedImage, setCroppedImage] = useState<string | null>(courseImage)
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
	const [imageUploaded, setImageUploaded] = useState(false)
	const [buttonLoading, setButtonLoading] = useState(false)
	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}, [])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => setImageSrc(reader.result as string)
		}
	}

	const handleCrop = async () => {
		if (imageSrc && croppedAreaPixels) {
			const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels)
			setCroppedImage(croppedImageUrl)
		}
	}
	const handleUploadPhoto = async () => {
		setButtonLoading(true)

		if (!croppedImage) {
			console.error('No cropped image available')
			setButtonLoading(false)
			return
		}

		const blob = await fetch(croppedImage).then(res => res.blob())
		const file = new File([blob], 'course-thumbnail.png', { type: 'image/png' })

		const formData = new FormData()
		formData.append('course_id', courseId)
		formData.append('thumbnail', file)

		try {
			const response = await fetch(`/api/course/upload-image`, {
				method: 'POST',
				body: formData,
			})
			const data = await response.json()
			console.log('Upload success:', data)
		} catch (err) {
			console.error('Upload error:', err)
		} finally {
			setButtonLoading(false)
			setImageUploaded(true)
		}
	}
	const handleChangePhoto = () => {
		setImageUploaded(false)
		setImageSrc(null)
		setCroppedImage(null)
	}

	return (
		<div className='w-full flex flex-col'>
			<Label className='font-semibold text-base my-1'>Course image</Label>
			<div className='w-full flex justify-between items-start gap-8'>
				<div className='w-1/2 h-64 relative border border-border'>
					{croppedImage ? (
						<Image className='object-cover' fill alt='course photo' src={croppedImage} />
					) : imageSrc ? (
						<Cropper
							style={{
								cropAreaStyle: { background: 'transparent' },
								containerStyle: { background: 'rgba(255,255,255,0.6)' },
							}}
							image={imageSrc}
							crop={crop}
							zoom={zoom}
							aspect={750 / 422}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={onCropComplete}
						/>
					) : (
						<div className='bg-primary flex justify-center items-center text-secondary h-full w-full'>
							<BookOpenText size={75} />
						</div>
					)}
				</div>
				<div className='w-1/2 flex flex-col'>
					<p className='text-muted-foreground mb-4 text-sm'>
						Upload your course image here. In order for us to accept this image, it must comply with our course image
						quality standards. Key rules: 750x422 pixels, .jpg, .jpeg, .gif or .png, no text.
					</p>
					<div className='flex justify-between items-center gap-4'>
						{!croppedImage && (
							<Input className='cursor-pointer' onChange={handleFileChange} accept='image/*' type='file' />
						)}
						{imageSrc && croppedImage && !imageUploaded ? (
							<Button onClick={handleUploadPhoto}>Update</Button>
						) : (
							<Button onClick={handleChangePhoto}>Change</Button>
						)}
						{imageSrc && !imageUploaded && (
							<Button onClick={handleCrop} className='mt-2'>
								Crop image
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CourseImageInput
