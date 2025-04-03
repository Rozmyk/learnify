import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
	const supabase = await createClient()

	const { data, error } = await supabase.from('types').select('*')

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json({ types: data })
}
