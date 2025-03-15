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

	const latestProgressByCourse = Object.values(
		userLessonProgress.reduce(
			(acc, entry) => {
				const courseId = entry.course.id
				if (!acc[courseId] || new Date(entry.created_at) > new Date(acc[courseId].created_at)) {
					acc[courseId] = entry
				}
				return acc
			},
			{} as Record<string, (typeof userLessonProgress)[number]>
		)
	)

	return NextResponse.json(latestProgressByCourse)
}
