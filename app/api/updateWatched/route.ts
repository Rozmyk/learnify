import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { lessonId, courseId } = await request.json()

		const supabase = await createClient()
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser()

		if (userError) {
			console.error(userError)
			return NextResponse.json({ error: userError.message }, { status: 500 })
		}

		if (!user) {
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
		}

		const { data: existingProgress, error: selectError } = await supabase
			.from('user_lessons_progress')
			.select('id, watched')
			.eq('user_id', user.id)
			.eq('lesson_id', lessonId)
			.single()

		if (selectError && selectError.code !== 'PGRST116') {
			console.error(selectError)
			return NextResponse.json({ error: selectError.message }, { status: 500 })
		}

		if (existingProgress) {
			if (!existingProgress.watched) {
				const { error: updateError } = await supabase
					.from('user_lessons_progress')
					.update({ watched: true })
					.eq('id', existingProgress.id)

				if (updateError) {
					return NextResponse.json({ error: updateError.message }, { status: 500 })
				}
			}
		} else {
			const { error: insertError } = await supabase.from('user_lessons_progress').insert([
				{
					user_id: user.id,
					lesson_id: lessonId,
					watched: true,
					course_id: courseId,
				},
			])

			if (insertError) {
				return NextResponse.json({ error: insertError.message }, { status: 500 })
			}
		}

		return NextResponse.json({ message: 'Watched status updated successfully' })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
