'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import CategorySelect from '../CategorySelect/CategorySelect'
import FileInput from './FileInput/FileInput'
const AddCourse = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState<number | ''>('')
	const [thumbnail, setThumbnail] = useState<File | null>(null)
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		if (price === '' || price < 0) {
			setError('The price must be a positive number')
			setLoading(false)
			return
		}

		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('price', price.toString())

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
		} else {
			console.log(data.message)
		}
	}

	useEffect(() => {
		setError('')
	}, [title, description, price, thumbnail, selectedCategory])

	return (
		<div className='w-full flex md:flex-row flex-col justify-center items-center gap-10 h-[calc(100vh-4rem)] p-2'>
			<form
				className='border border-border w-full sm:w-[30rem] p-4 rounded-xl flex flex-col gap-4'
				onSubmit={handleSubmit}>
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
				<Input
					type='number'
					value={price}
					onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
					placeholder='100'
					min='0'
					required
				/>

				<FileInput setThumbnail={setThumbnail} />

				{error && <p className='text-red-500'>{error}</p>}

				<Button type='submit' disabled={loading}>
					{loading ? 'Adding Course...' : 'Add Course'}
				</Button>
			</form>
		</div>
	)
}

export default AddCourse
