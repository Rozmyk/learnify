import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const supabase = await createClient()

	const { searchParams } = new URL(req.url)
	const course_id = searchParams.get('course_id')
	const review_id = searchParams.get('review_id')
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (!user) {
		return NextResponse.json({ error: 'User is required' }, { status: 400 })
	}

	if (!course_id || !review_id) {
		return NextResponse.json({ error: 'CourseId and reviewId is required' }, { status: 400 })
	}

	let query = supabase.from('reviews').delete().eq('course_id', course_id).eq('author_id', user.id).eq('id', review_id)

	const { error } = await query

	if (error) {
		console.log(error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
	return NextResponse.json({ message: 'The review has been removed.' }, { status: 200 })
}
