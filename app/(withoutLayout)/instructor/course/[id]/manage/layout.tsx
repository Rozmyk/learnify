import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ManageSidebar from '@/components/ManageCoursePage/ManageSidebar/ManageSidebar'
import isAuthorOfCourse from '@/lib/isAuthorOfCourse'
import Loader from '@/components/ui/loader'
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
			<div className='md:w-1/4 w-full '>
				<ManageSidebar courseId={id} />
			</div>
			<div className='md:w-3/4 w-full'>{children}</div>
		</div>
	)
}
