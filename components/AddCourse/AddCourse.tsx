'use client'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'

const AddCourse = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState<number | string>('')
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

		if (user) {
			const thumbnailUrl = thumbnail ? await uploadThumbnail(thumbnail) : null

			const { data, error: insertError } = await supabase.from('course').insert([
				{
					title,
					id: uuidv4(),
					description,
					price: typeof price === 'string' ? parseFloat(price) : price,
					thumbnail: thumbnailUrl,
					author_id: user.id,
					created_at: new Date().toISOString(),
				},
			])

			setLoading(false)
			if (insertError) {
				setError(insertError.message)
			} else {
				console.log('Course added successfully:', data)
			}
		} else {
			setLoading(false)
			setError('User not authenticated.')
		}
	}

	const uploadThumbnail = async (file: File) => {
		return 'url_to_file'
	}

	return (
		<div>
			<Label>Title</Label>
			<Input onChange={e => setTitle(e.target.value)} value={title} placeholder='Next js for beginners' required />

			<Label>Description</Label>
			<Input
				onChange={e => setDescription(e.target.value)}
				value={description}
				placeholder='Next js for beginners'
				required
			/>

			<Label>Price</Label>
			<Input onChange={e => setPrice(e.target.value)} value={price} placeholder='100' type='number' required />

			<div>
				<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Upload file</label>
				<input
					onChange={e => setThumbnail(e.target.files ? e.target.files[0] : null)}
					className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
					aria-describedby='file_input_help'
					type='file'
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
