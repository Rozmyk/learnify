import { createClient } from '@/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
	try {
		const formData = await request.formData()

		const title = formData.get('title') as string
		const type = formData.get('type') as string
		const description = formData.get('description') as string
		const language = formData.get('language') as string
		const level = formData.get('level') as string
		const subtitle = formData.get('subtitle') as string
		const time_commitment = formData.get('time_commitment') as string
		const categories_id = formData.get('categories_id') as string
		const course_id = formData.get('course_id') as string
		const thumbnail = formData.get('thumbnail') as File | null
		const price = formData.get('price') as string
		const currency = formData.get('currency') as string
		const welcome_message = formData.get('welcome_message') as string
		const congratulatory_message = formData.get('congratulatory_message') as string

		if (!title || !type || !time_commitment || !categories_id || !course_id) {
			return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 })
		}

		let updateData: Record<string, any> = {
			title,
			type,
			level,
			subtitle,
			description,
			currency,
			price,
			language,
			time_commitment,
			welcome_message,
			congratulatory_message,
			categories_id,
		}

		if (thumbnail) {
			const fileExt = thumbnail.name.split('.').pop()
			const fileName = `${uuidv4()}.${fileExt}`
			const filePath = `courses/${fileName}`

			const supabase = await createClient()
			const { error: uploadError } = await supabase.storage.from('course-thumbnails').upload(filePath, thumbnail)

			if (uploadError) {
				console.error('Upload error:', uploadError.message)
				return NextResponse.json({ error: 'Error uploading file: ' + uploadError.message }, { status: 500 })
			}

			const { data: publicUrlData } = supabase.storage.from('course-thumbnails').getPublicUrl(filePath)
			updateData.thumbnail = publicUrlData.publicUrl
		}

		const supabase = await createClient()

		const { error: updateError } = await supabase.from('course').update(updateData).eq('id', course_id)

		if (updateError) {
			console.error('Update error:', updateError.message)
			return NextResponse.json({ error: updateError.message }, { status: 500 })
		}

		return NextResponse.json({ message: 'Course updated successfully!' })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
	}
}
