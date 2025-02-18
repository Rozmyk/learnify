import { createClient } from '@/utils/supabase/server'

export async function fetchUserProfileData(userId: string) {
	const supabase = await createClient()
	const { data: profileData, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

	if (error) {
		console.error('Error fetching profile data:', error)
		return null
	}

	return profileData
}
