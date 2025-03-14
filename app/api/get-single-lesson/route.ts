import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
	const supabase = await createClient()
	const lessonId = req.nextUrl.searchParams.get('lessonId')
	
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError) {
		return NextResponse.json({ error: 'Auth error' }, { status: 404 })
	}
	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

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

	const { data: userLessonProgress, error: userLessonProgressError } = await supabase
		.from('user_lessons_progress')
		.select('*')
		.eq('user_id', user.id)
		.eq('lesson_id', lessonId)
		.maybeSingle()

	if (userLessonProgressError) {
		return NextResponse.json({ error: 'User progress not found' }, { status: 404 })
	}

	return NextResponse.json({
		lesson,
		userLessonProgress,
	})
}
