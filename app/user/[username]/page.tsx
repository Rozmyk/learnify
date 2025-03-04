import { createClient } from '@/utils/supabase/server'
import UserPage from '@/components/UserPage/UserPage'
import TeacherPage from '@/components/TeacherPage/TeacherPage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function page({ params }: { params: Promise<{ username: string }> }) {
	const username = (await params).username
	const supabase = await createClient()

	const { data: userData, error } = await supabase.from('profiles').select('*').eq('username', username).single()

	if (error || !userData) {
		return (
			<div className='border border-border p-4 my-8 rounded-lg flex flex-col justify-center items-center'>
				<h3 className='text-center text-xl  font-semibold'>User not found</h3>
				<p className='mb-8 text-muted-foreground'>Redirect to home page</p>
				<Link href={'/'}>
					<Button>Home</Button>
				</Link>
			</div>
		)
	}

	return userData.isTeacher ? <TeacherPage userData={userData} /> : <UserPage userData={userData} />
}
