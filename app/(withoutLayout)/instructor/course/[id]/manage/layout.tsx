import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ManageSidebar from '@/components/ManageCoursePage/ManageSidebar/ManageSidebar'
export default async function Layout({ children }: { children: React.ReactNode }) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}
	return (
		<div className=' flex md:flex-row min-h-screen gap-4'>
			<div className='md:w-1/4 w-full '>
				<ManageSidebar />
			</div>
			<div className='md:w-3/4 w-full  '>{children}</div>
		</div>
	)
}
