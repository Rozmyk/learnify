import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const course_id = searchParams.get('course_id')
	const limit = searchParams.get('limit')

	if (!course_id) {
		return NextResponse.json({ courses: [] })
	}

	let query = supabase.from('sections').select('*, lessons(*)').eq('course_id', course_id)

	if (limit) {
		query = query.limit(Number(limit))
	}

	const { data, error } = await query

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json(data)
}
