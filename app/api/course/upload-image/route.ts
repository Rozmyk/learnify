import { createClient } from '@/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const thumbnail = formData.get('thumbnail') as File | null
		const course_id = formData.get('course_id') as string

		if (!thumbnail || !course_id) {
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

		const { error: insertError } = await supabase.from('course').update({ thumbnail: thumbnailUrl }).eq('id', course_id)

		if (insertError) {
			return NextResponse.json({ error: insertError.message }, { status: 500 })
		}
		console.log(course_id)

		return NextResponse.json({ message: 'Thumbnail added successfully!' })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
	}
}
