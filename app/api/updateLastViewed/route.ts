import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { courseId } = await request.json()
		const supabase = await createClient()
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser()
		if (userError) {
			console.log(userError)
		}
		if (user) {
			const { error } = await supabase.from('profiles').update({ lastViewedCourseId: courseId }).eq('id', user.id)

			if (error) {
				return NextResponse.json({ error: error.message }, { status: 500 })
			}
		} else {
			return NextResponse.json({ error: 'User not authenticated' })
		}

		return NextResponse.json({ message: 'Updated successfully' })
	} catch (err) {
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
