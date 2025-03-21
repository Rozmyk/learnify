import MyWishlistPage from '@/components/MyWishlistPage/MyWishlistPage'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
export default async function MyCourses() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}
	return <MyWishlistPage />
}
