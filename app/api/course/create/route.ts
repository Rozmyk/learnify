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
		console.log(formData)
		const type = formData.get('type') as string
		const title = formData.get('title') as string
		const time_commitment = formData.get('time_commitment') as string
		const categories_id = formData.get('categories_id') as string

		if (!title || !type || !time_commitment || !categories_id) {
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

		let slug = createSlug(title)

		const { error: insertError } = await supabase.from('course').insert([
			{
				id: uuidv4(),
				title,
				type,
				time_commitment,
				author_id: user.id,
				categories_id,
				slug,
			},
		])

		if (insertError) {
			console.log(insertError)
			return NextResponse.json({ error: insertError.message }, { status: 500 })
		}

		return NextResponse.json({ message: 'Course added successfully!' })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
	}
}
