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
		.select('*, course(*)')
		.eq('id', lessonId)
		.single()

	if (lessonError || !lesson) {
		return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
	}

	return NextResponse.json({
		lesson,
	})
}
