import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { lessonId } = await request.json()

		const supabase = await createClient()
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser()

		if (userError) {
			console.error(userError)
			return NextResponse.json({ error: userError.message }, { status: 500 })
		}

		if (user) {
			const { error } = await supabase.from('user-lessons-progress').insert([
				{
					user_id: user.id,
					lesson_id: lessonId,
					watched: true,
				},
			])

			if (error) {
				return NextResponse.json({ error: error.message }, { status: 500 })
			}
		} else {
			return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
		}

		return NextResponse.json({ message: 'Updated successfully' })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
