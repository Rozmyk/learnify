'use client'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'

const AddCourse = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [thumbnail, setThumbnail] = useState<File | null>(null)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const addCourse = async () => {
		if (!title || !description || !price || !thumbnail) {
			setError('All fields are required.')
			return
		}

		setLoading(true)
		const supabase = await createClient()

		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user) {
			setLoading(false)
			setError('User not authenticated.')
			return
		}

		const fileExt = thumbnail.name.split('.').pop()
		const fileName = `${uuidv4()}.${fileExt}`
		const filePath = `courses/${fileName}`

		const { data: uploadData, error: uploadError } = await supabase.storage
			.from('course-thumbnails')
			.upload(filePath, thumbnail)

		if (uploadError) {
			setLoading(false)
			setError('Error uploading file: ' + uploadError.message)
			return
		}

		const { data: publicUrlData } = supabase.storage.from('course-thumbnails').getPublicUrl(filePath)
		const thumbnailUrl = publicUrlData.publicUrl

		const { error: insertError } = await supabase.from('course').insert([
			{
				title,
				id: uuidv4(),
				description,
				price,
				thumbnail: thumbnailUrl,
				author_id: user.id,
				created_at: new Date().toISOString(),
			},
		])

		setLoading(false)

		if (insertError) {
			setError(insertError.message)
		} else {
			console.log('Course added successfully!')
			setTitle('')
			setDescription('')
			setPrice('')
			setThumbnail(null)
			setError('')
		}
	}
	useEffect(() => {
		setError('')
	}, [title, description, price, thumbnail])

	return (
		<div>
			<Label>Title</Label>
			<Input onChange={e => setTitle(e.target.value)} value={title} placeholder='Next.js for beginners' required />

			<Label>Description</Label>
			<Input
				onChange={e => setDescription(e.target.value)}
				value={description}
				placeholder='Next.js course description'
				required
			/>

			<Label>Price</Label>
			<Input onChange={e => setPrice(e.target.value)} value={price} placeholder='100' type='number' required />

			<div>
				<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Upload file</label>
				<input
					onChange={e => setThumbnail(e.target.files?.[0] || null)}
					className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
					aria-describedby='file_input_help'
					type='file'
					accept='image/*'
				/>
				<p className='mt-1 text-sm text-gray-500 dark:text-gray-300' id='file_input_help'>
					SVG, PNG, JPG or GIF (MAX. 800x400px).
				</p>
			</div>

			{error && <p className='text-red-500'>{error}</p>}

			<button onClick={addCourse} className='mt-4 bg-blue-500 text-white p-2 rounded' disabled={loading}>
				{loading ? 'Adding Course...' : 'Add Course'}
			</button>
		</div>
	)
}

export default AddCourse
