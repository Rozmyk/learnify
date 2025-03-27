import BasicPage from '@/components/ManageCoursePage/pages/BasicPage/BasicPage'
import { createClient } from '@/utils/supabase/server'
export default async function page({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	const supabase = await createClient()
	const { data: course, error } = await supabase.from('course').select('* ').eq('id', id)
	console.log(course)
	return course && <BasicPage courseData={course[0]} courseId={id} />
}
