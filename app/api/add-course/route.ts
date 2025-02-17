import { createClient } from '@/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

const createSlug = (title: string): string => {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const title = formData.get('title') as string
		const description = formData.get('description') as string
		const price = formData.get('price') as string
		const thumbnail = formData.get('thumbnail') as File | null
		const categories_id = formData.get('categories_id') as string

		if (!title || !description || !price || !thumbnail || !categories_id) {
			return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
		}

		const supabase = await createClient()

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser()

		if (authError || !user) {
			return NextResponse.json({ error: 'User not authenticated.' }, { status: 401 })
		}

		const fileExt = thumbnail.name.split('.').pop()
		const fileName = `${uuidv4()}.${fileExt}`
		const filePath = `courses/${fileName}`

		const { error: uploadError } = await supabase.storage.from('course-thumbnails').upload(filePath, thumbnail)

		if (uploadError) {
			return NextResponse.json({ error: 'Error uploading file: ' + uploadError.message }, { status: 500 })
		}

		const { data: publicUrlData } = supabase.storage.from('course-thumbnails').getPublicUrl(filePath)
		const thumbnailUrl = publicUrlData.publicUrl

		let slug = createSlug(title)

		const { error: insertError } = await supabase.from('course').insert([
			{
				id: uuidv4(),
				title,
				description,
				price,
				thumbnail: thumbnailUrl,
				author_id: user.id,
				categories_id,
				slug,
				created_at: new Date().toISOString(),
			},
		])

		if (insertError) {
			return NextResponse.json({ error: insertError.message }, { status: 500 })
		}

		return NextResponse.json({ message: 'Course added successfully!' })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
	}
}
