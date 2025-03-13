import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { fetchUserProfileData } from '@/lib/fetchUserProfileData'
import { ProfileDataProps } from '@/types/api'
import PageContainer from '@/components/PageContainer/PageContainer'
import EditProfile from '@/components/EditProfile/EditProfile'

export default async function EditProfilePage() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/')
	}
	const profileData: ProfileDataProps = await fetchUserProfileData(user.id)

	return (
		<PageContainer>
			<EditProfile profileData={profileData} />
		</PageContainer>
	)
}
