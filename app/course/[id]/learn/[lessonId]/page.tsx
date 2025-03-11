export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
	const lessonId = (await params).lessonId

	return <div>lesson id {lessonId}</div>
}
