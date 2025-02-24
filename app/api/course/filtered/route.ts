import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const supabase = await createClient()
	try {
		const body = await req.json()

		if (!Array.isArray(body.excludedPosts)) {
			return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
		}

		const { data, error } = await supabase
			.from('course')
			.select('*, profiles(*), categories(*)')
			.not('id', 'in', `(${body.excludedPosts.join(',')})`)

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json(data, { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
