import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const author_id = searchParams.get('author_id')
	const limit = searchParams.get('limit')

	if (!author_id) {
		return NextResponse.json({ courses: [] })
	}

	let query = supabase.from('course').select('*, categories(*), profiles(*), reviews(*)').eq('author_id', author_id)

	if (limit) {
		query = query.limit(Number(limit))
	}

	const { data, error } = await query

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json({ courses: data })
}
