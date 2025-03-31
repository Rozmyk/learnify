import PageContainer from '@/components/PageContainer/PageContainer'
import SingleCoursePage from '@/components/SIngleCoursePage/SingleCoursePage'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import isAuthorOfCourse from '@/lib/isAuthorOfCourse'
export default async function page({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	const supabase = await createClient()
	const { data, error } = await supabase
		.from('course')
		.select(
			`
				  *,
				  reviews(*, profiles(*)),
				  categories(*),
				  profiles(*)
				 
				`
		)
		.eq('id', id)
		.eq('status', 'draft')
		.single()
	const hasAccess = await isAuthorOfCourse(id)
	if (error) {
		console.error('Error fetching course:', error.message)
	}
	if (!hasAccess || !data) {
		redirect('/instructor/courses')
		return null
	}
	return (
		<PageContainer>
			<SingleCoursePage draftMode={true} course={data} />
		</PageContainer>
	)
}
