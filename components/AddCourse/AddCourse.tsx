'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'

const AddCourse = ({ handleAddNewCourse }: { handleAddNewCourse: () => void }) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [thumbnail, setThumbnail] = useState('')

	// Funkcja obsługująca dodawanie nowego kursu
	const addCourse = async () => {
		const id = 'sdasddsada' // Unikalne ID kursu
		const supabase = await createClient()

		// Pobranie danych użytkownika
		const {
			data: { user },
		} = await supabase.auth.getUser()

		// Wstawianie kursu do bazy danych
		const { data, error: insertError } = await supabase.from('course').insert([
			{
				title,
				id,
				description,
				price,
				thumbnail,
				author_id: user.id,
				created_at: new Date().toISOString(),
			},
		])

		if (insertError) {
			console.log(insertError)
		} else {
			console.log('Course added successfully:', data)
		}
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
					value={thumbnail}
					onChange={e => setThumbnail(e.target.value)}
					className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
					aria-describedby='file_input_help'
					type='file'
				/>
				<p className='mt-1 text-sm text-gray-500 dark:text-gray-300' id='file_input_help'>
					SVG, PNG, JPG or GIF (MAX. 800x400px).
				</p>
			</div>

			<button onClick={addCourse} className='mt-4 bg-blue-500 text-white p-2 rounded'>
				Add Course
			</button>
		</div>
	)
}

export default AddCourse
