import SingleCoursePage from '@/components/SIngleCoursePage/SingleCoursePage'
import { createClient } from '@/utils/supabase/server'
import PageContainer from '@/components/PageContainer/PageContainer'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
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
		.eq('slug', id)
		.single()

	if (error) {
		console.log(error.message)
	}
	return (
		<PageContainer>
			<SingleCoursePage course={data} />
		</PageContainer>
	)
}
