import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const rating = formData.get('rating')
		if (rating === null || isNaN(Number(rating))) {
			return NextResponse.json({ error: 'Rating must be a valid number.' }, { status: 400 })
		}
		const ratingNumber = Number(rating)

		const course_id = formData.get('course_id') as string
		const content = formData.get('content') as string

		if (!rating || !course_id) {
			console.log(rating, course_id)
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

		const { error: insertError } = await supabase.from('reviews').insert([
			{
				rating: ratingNumber,
				course_id,
				content,
				author_id: user.id,
			},
		])

		if (insertError) {
			return NextResponse.json({ error: insertError.message }, { status: 500 })
		}

		return NextResponse.json({ message: 'Review added successfully!' })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
	}
}
