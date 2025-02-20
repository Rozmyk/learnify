import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { username, description, website } = await request.json()

		if (!username) {
			return NextResponse.json({ error: 'Username is required.' }, { status: 400 })
		}

		if (username.length < 3 || username.length > 20) {
			return NextResponse.json({ error: 'Username must be between 3 and 20 characters.' }, { status: 400 })
		}

		if (website && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(website)) {
			return NextResponse.json({ error: 'Invalid website URL.' }, { status: 400 })
		}

		const supabase = await createClient()

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser()

		if (authError || !user) {
			return NextResponse.json({ error: 'User not authenticated.' }, { status: 401 })
		}

		const { data: existingUser, error: usernameCheckError } = await supabase
			.from('profiles')
			.select('id')
			.eq('username', username)
			.single()

		if (existingUser && existingUser.id !== user.id) {
			return NextResponse.json({ error: 'Username is already taken.' }, { status: 409 })
		}

		if (usernameCheckError && usernameCheckError.code !== 'PGRST116') {
			return NextResponse.json({ error: 'Database error.' }, { status: 500 })
		}

		const { error: updateError } = await supabase
			.from('profiles')
			.update({
				username,
				description,
				website,
			})
			.eq('id', user.id)

		if (updateError) {
			return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 })
		}

		return NextResponse.json({ message: 'Profile updated successfully.' }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
	}
}
