import BasicPage from '@/components/ManageCoursePage/pages/BasicPage/BasicPage'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	return <BasicPage courseId={id} />
}
