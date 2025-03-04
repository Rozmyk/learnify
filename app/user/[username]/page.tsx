import { createClient } from '@/utils/supabase/server'
import UserPage from '@/components/UserPage/UserPage'
import TeacherPage from '@/components/TeacherPage/TeacherPage'

export default async function page({ params }: { params: Promise<{ username: string }> }) {
	const username = (await params).username
	const supabase = await createClient()

	const { data: userData, error } = await supabase.from('profiles').select('*').eq('username', username).single()

	if (error || !userData) {
		return <p className='text-center text-red-500'>User not found</p>
	}

	return userData.isTeacher ? <TeacherPage userData={userData} /> : <UserPage userData={userData} />
}
