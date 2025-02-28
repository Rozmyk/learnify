import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const course_id = searchParams.get('course_id')

	if (!course_id) {
		return NextResponse.json({ courses: [] })
	}

	const { data, error } = await supabase
		.from('reviews')
		.select('*, profiles(*)')
		.eq('course_id', course_id)
		.order('created_at', { ascending: false })

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json({ courses: data })
}
