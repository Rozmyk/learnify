import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const supabase = await createClient()

		const { data, error } = await supabase
			.from('course')
			.select(`*, owned_courses(count)`, { count: 'exact' })
			.order('owned_courses.count', { ascending: false })

		if (error) {
			console.error('Błąd podczas pobierania kursów:', error)
			return NextResponse.json({ message: 'Nie udało się pobrać kursów' }, { status: 500 })
		}

		return NextResponse.json(data, { status: 200 })
	} catch (err) {
		console.error('Błąd serwera:', err)
		return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 })
	}
}
