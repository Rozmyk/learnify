import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('course')
			.select(`*, owned_courses(count)`, { count: 'exact' })
			.order('owned_courses.count', { ascending: false })

		if (error) {
			console.error('Error untile fetch courses', error)
			return NextResponse.json({ message: 'Failed to fetch course data' }, { status: 500 })
		}

		return NextResponse.json(data, { status: 200 })
	} catch (err) {
		console.error('Server error', err)
		return NextResponse.json({ message: 'Server error' }, { status: 500 })
	}
}
