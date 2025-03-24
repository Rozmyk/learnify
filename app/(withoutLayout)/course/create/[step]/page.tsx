import RenderStepsPage from '@/components/RenderStepsPage/RenderStepsPage'

export default async function Page({ params }: { params: Promise<{ step: string }> }) {
	const step = (await params).step

	return <RenderStepsPage step={step} />
}
