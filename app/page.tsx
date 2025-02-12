import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

import ProtectedHeader from '@/components/ProtectedHeader/ProtecetedHeader'
export default async function Home() {
	const supabase = await createClient()
	const { data: courses, error } = await supabase.from('course').select()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/sign-in')
	}
	return (
		<>
			<main className='flex-1 flex flex-col gap-6 h-screen p-4'>
				<ProtectedHeader />
				{courses && courses.map(course => <div key={course.id}>{course.title}</div>)}
			</main>
		</>
	)
}
