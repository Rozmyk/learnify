import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const courseId = searchParams.get('courseId')

	if (!courseId) {
		return NextResponse.json({ error: 'Missing courseId' }, { status: 400 })
	}

	const supabase = await createClient()

	const { data: owners, error: error1 } = await supabase
		.from('owned_courses')
		.select('user_id')
		.eq('course_id', courseId)

	if (error1 || !owners?.length) {
		return NextResponse.json({ courses: [] })
	}

	const userIds = owners.map(o => o.user_id)

	// 2. Pobierz inne kursy, które ci użytkownicy kupili
	const { data: alsoBoughtRaw, error: error2 } = await supabase
		.from('owned_courses')
		.select('course_id')
		.in('user_id', userIds)
		.neq('course_id', courseId)

	if (error2 || !alsoBoughtRaw?.length) {
		return NextResponse.json({ courses: [] })
	}

	// 3. Zlicz wystąpienia kursów
	const freq: { [key: string]: number } = {}
	alsoBoughtRaw.forEach(entry => {
		freq[entry.course_id] = (freq[entry.course_id] || 0) + 1
	})

	const sortedCourseIds = Object.entries(freq)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([id]) => id)

	// 4. Pobierz dane o tych kursach
	const { data: courses, error: error3 } = await supabase.from('course').select('*').in('id', sortedCourseIds)

	if (error3) {
		return NextResponse.json({ error: error3.message }, { status: 500 })
	}

	return NextResponse.json({ courses })
}
