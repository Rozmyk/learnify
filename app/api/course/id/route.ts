import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const id = searchParams.get('id')

	if (!id) {
		return NextResponse.json({ courses: [] })
	}

	let query = supabase
		.from('course')
		.select(
			'*, categories(*), profiles(*), reviews(*), lessons(*), languages(*), currencies(*), prices(*),levels(*), times_commited(*), types(*)'
		)
		.eq('id', id)

		.single()

	const { data, error } = await query

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json(data)
}
