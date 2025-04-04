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
		if (!user) {
			return NextResponse.json({ error: 'User not authenticated' })
		}

		const { error: updateError } = await supabase.from('course').update({ status: 'published' }).eq('id', courseId)
		if (updateError) {
			return NextResponse.json({ error: updateError.message }, { status: 500 })
		}
		return NextResponse.json({ message: 'Updated successfully' })
	} catch (err) {
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
