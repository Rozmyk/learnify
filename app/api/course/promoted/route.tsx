import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from('promoted')
		.select(
			`
        *,
        course(
          *,
          profiles:author_id(*), categories(*), reviews(*)
        )
      `
		)
		.single()
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
	return NextResponse.json(data.course)
}
