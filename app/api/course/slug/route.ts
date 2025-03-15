import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const slug = searchParams.get('slug')

	if (!slug) {
		return NextResponse.json({ courses: [] })
	}

	let query = supabase
		.from('course')
		.select('*, categories(*), profiles(*), reviews(*), lessons(*)')
		.eq('slug', slug)
		.single()

	const { data, error } = await query

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json(data)
}
