import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const code = searchParams.get('code')

	if (!code) {
		return NextResponse.json({ error: 'Code parameter is required' }, { status: 400 })
	}

	const supabase = await createClient()

	try {
		const { data, error } = await supabase.from('promoCodes').select('*').eq('value', code)

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		if (data && data.length > 1) {
			return NextResponse.json({ error: 'Multiple promo codes found' }, { status: 400 })
		}

		if (!data || data.length === 0) {
			return NextResponse.json({ error: 'Promo code not found' }, { status: 404 })
		}

		return NextResponse.json(data[0], { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 })
	}
}
