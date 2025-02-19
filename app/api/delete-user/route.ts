import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
	try {
		const supabase = await createClient()
		const { id } = await request.json()

		if (!id) {
			return NextResponse.json({ error: 'User ID is missing' }, { status: 400 })
		}

		const { error } = await supabase.auth.admin.deleteUser(id)

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json({ message: 'User successfully deleted' }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: 'An error occurred while deleting the user' }, { status: 500 })
	}
}
