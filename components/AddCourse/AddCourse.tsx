'use client'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import CategorySelect from './CategorySelect/CategorySelect'
const AddCourse = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [thumbnail, setThumbnail] = useState<File | null>(null)
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true)
		e.preventDefault()
		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('price', price)
		if (selectedCategory) {
			formData.append('categories_id', selectedCategory)
		}
		if (thumbnail) {
			formData.append('thumbnail', thumbnail)
		}

		const response = await fetch('/api/add-course', {
			method: 'POST',
			body: formData,
		})

		const data = await response.json()
		setLoading(false)
		if (!response.ok) {
			setError(data.error)
			setLoading(false)
		} else {
			console.log(data.message)
		}
	}

	useEffect(() => {
		setError('')
	}, [title, description, price, thumbnail])

	return (
		<div className='w-full flex md:flex-row flex-col justify-center items-center gap-10 h-[calc(100vh-4rem)] p-2'>
			<div className='border border-border  w-full sm:w-[30rem] p-4 rounded-xl flex flex-col gap-4'>
				<Label>Title</Label>
				<Input onChange={e => setTitle(e.target.value)} value={title} placeholder='Next.js for beginners' required />
				<CategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

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

				<Button onClick={handleSubmit} disabled={loading}>
					{loading ? 'Adding Course...' : 'Add Course'}
				</Button>
			</div>
		</div>
	)
}

export default AddCourse
