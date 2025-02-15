interface CoursePageProps {
	params: {
		id: string
	}
}
export default async function CoursePage({ params }: CoursePageProps) {
	return <div>{params.id}</div>
}
