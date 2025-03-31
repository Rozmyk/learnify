'use client'

import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { BookOpenText } from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/lib/getCroppedImg'
import { Button } from '@/components/ui/button'
import { Area } from 'react-easy-crop/types'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'

const CourseImageInput = () => {
	const { temporaryData, setTemporaryData, setThumbnailData } = useCreateCourseStore()
	const [imageSrc, setImageSrc] = useState<string | null>(null)
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
	const [objectUrl, setObjectUrl] = useState<string | null>(null)

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
			try {
				const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)

				if (!croppedBlob) {
					console.error('Cropping failed: Blob is null')
					return
				}

				const newObjectUrl = URL.createObjectURL(croppedBlob)

				setObjectUrl(newObjectUrl)
				setTemporaryData({ thumbnail: newObjectUrl })
				setThumbnailData(croppedBlob)
			} catch (error) {
				console.error('Cropping error:', error)
			}
		}
	}

	const handleChangePhoto = () => {
		if (objectUrl) {
			URL.revokeObjectURL(objectUrl)
		}
		setObjectUrl(null)
		setImageSrc(null)
		setTemporaryData({ thumbnail: undefined })
	}

	useEffect(() => {
		return () => {
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl)
			}
		}
	}, [objectUrl])

	return (
		<div className='w-full flex flex-col'>
			<Label className='font-semibold text-base my-1'>Course image</Label>
			<div className='w-full flex justify-between items-start gap-8'>
				<div className='w-1/2 h-64 relative border border-border'>
					{temporaryData.thumbnail ? (
						<Image
							className='object-cover'
							fill
							alt='course photo'
							src={temporaryData.thumbnail}
							onError={e => console.error('Image load error:', e)}
						/>
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
						{!temporaryData.thumbnail && (
							<Input className='cursor-pointer' onChange={handleFileChange} accept='image/*' type='file' />
						)}

						{temporaryData.thumbnail && <Button onClick={handleChangePhoto}>Change</Button>}

						{imageSrc && !temporaryData.thumbnail && (
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
