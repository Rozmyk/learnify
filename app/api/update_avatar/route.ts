import { createClient } from '@/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const avatar = formData.get('avatar') as File | null

		if (!avatar) {
			return NextResponse.json({ error: 'Avatar file is required.' }, { status: 400 })
		}

		const supabase = await createClient()

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser()

		if (authError || !user) {
			return NextResponse.json({ error: 'User not authenticated.' }, { status: 401 })
		}

		const fileExt = avatar.name.split('.').pop()
		const fileName = `${uuidv4()}.${fileExt}`
		const filePath = `usersAvatar/${fileName}`

		const { error: uploadError } = await supabase.storage.from('usersAvatar').upload(filePath, avatar)

		if (uploadError) {
			return NextResponse.json({ error: 'Error uploading file: ' + uploadError.message }, { status: 500 })
		}

		const { data: publicUrlData } = supabase.storage.from('usersAvatar').getPublicUrl(filePath)
		const avatarUrl = publicUrlData.publicUrl

		const { error: updateError } = await supabase.from('profiles').update({ avatar_url: avatarUrl }).eq('id', user.id)

		if (updateError) {
			return NextResponse.json({ error: updateError.message }, { status: 500 })
		}

		return NextResponse.json({ message: 'Avatar updated successfully!', avatarUrl })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
	}
}
