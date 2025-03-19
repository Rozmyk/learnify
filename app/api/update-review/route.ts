import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const supabase = await createClient()
		const body = await req.json()

		const rating = parseInt(body.rating, 10)
		const review_id = body.review_id
		const content = body.content

		if (isNaN(rating) || !content || !review_id) {
			return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
		}

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser()

		if (authError || !user) {
			return NextResponse.json({ error: 'User not authenticated.' }, { status: 401 })
		}

		const { data, error: updateError } = await supabase
			.from('reviews')
			.update({ rating, content })
			.eq('id', review_id)
			.select('*')
			.single()

		if (updateError) {
			return NextResponse.json({ error: updateError.message }, { status: 500 })
		}

		return NextResponse.json({ review: data, message: 'Review updated successfully!' })
	} catch (error) {
		console.error('Server error:', error)
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
	}
}
