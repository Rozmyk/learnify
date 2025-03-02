import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const categories_id = searchParams.get('categories_id')

	if (!categories_id) {
		return NextResponse.json({ courses: [] })
	}

	const { data, error } = await supabase
		.from('course')
		.select('*, categories(*), profiles(*), reviews(*)')
		.eq('categories_id', categories_id)
		.limit(10)

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json({ courses: data })
}
