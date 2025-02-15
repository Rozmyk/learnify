import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const id = searchParams.get('id')
	const supabase = await createClient()

	try {
		const { data, error } = await supabase
			.from('course')
			.select(
				`
              *,
              reviews(*),
              categories(*),
              profiles(*)
            `
			)
			.eq('id', id)
			.single()

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 })
	}
}
