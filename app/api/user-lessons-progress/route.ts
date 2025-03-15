import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
	const supabase = await createClient()

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

	const { data: userLessonProgress, error: userLessonProgressError } = await supabase
		.from('user_lessons_progress')
		.select('*, course(*), lessons(*)')
		.eq('user_id', user.id)

	if (userLessonProgressError) {
		return NextResponse.json({ error: 'User progress not found' }, { status: 404 })
	}

	return NextResponse.json(userLessonProgress)
}
