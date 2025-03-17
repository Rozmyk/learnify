import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const course_id = searchParams.get('course_id')
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (!user) {
		return NextResponse.json({ error: 'user is required' }, { status: 400 })
	}

	if (!course_id) {
		return NextResponse.json({ courses: [] })
	}

	let query = supabase.from('reviews').select('*').eq('course_id', course_id).eq('author_id', user.id).maybeSingle()
	const { data, error } = await query

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json(data)
}
