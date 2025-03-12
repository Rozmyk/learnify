import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
	const supabase = await createClient()
	const lessonId = req.nextUrl.searchParams.get('lessonId')

	if (!lessonId) {
		return NextResponse.json({ error: 'lessonId is required' }, { status: 400 })
	}

	const { data: lesson, error: lessonError } = await supabase
		.from('lessons')
		.select('course_id')
		.eq('id', lessonId)
		.single()

	if (lessonError || !lesson) {
		return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
	}

	const courseId = lesson.course_id

	const { data: sections, error: sectionsError } = await supabase
		.from('sections')
		.select('*, lessons(*)')
		.eq('course_id', courseId)
		.order('order', { ascending: true })

	if (sectionsError) {
		return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 })
	}

	return NextResponse.json({
		sections,
	})
}
