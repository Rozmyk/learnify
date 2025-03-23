import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const supabase = await createClient()
	try {
		const { searchParams } = new URL(req.url)
		const userId = searchParams.get('userId')

		if (!userId) {
			return NextResponse.json({ message: 'Missing user ID' }, { status: 400 })
		}

		const { data: userData, error: userError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', userId)
			.maybeSingle()

		if (userError) {
			return NextResponse.json({ message: 'Error fetching profile data', error: userError }, { status: 500 })
		}

		return NextResponse.json({ userData }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: 'An unexpected error occurred', error }, { status: 500 })
	}
}
