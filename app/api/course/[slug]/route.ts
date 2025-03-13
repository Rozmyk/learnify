import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
	const { slug } = await params
	console.log('API hit with slug:', slug)

	const supabase = await createClient()

	try {
		const { data, error } = await supabase.from('course').select('*, reviews(*), profiles(*)').eq('slug', slug).single()

		if (error) {
			console.error('Supabase error:', error)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.error('Unexpected error:', error)
		return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 })
	}
}
