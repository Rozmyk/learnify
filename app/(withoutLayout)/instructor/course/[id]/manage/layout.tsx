import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import isAuthorOfCourse from '@/lib/isAuthorOfCourse'
import CourseProvider from '@/components/ManageCoursePage/CourseProvider/CourseProvider'
export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ id: string }>
}) {
	const supabase = await createClient()
	const id = (await params).id

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}
	const hasAcces = await isAuthorOfCourse(id)
	if (!hasAcces) {
		redirect('/')
	}

	return (
		<div className=' flex md:flex-row min-h-screen gap-4'>
			<CourseProvider courseId={id}>{children}</CourseProvider>
		</div>
	)
}
