import RenderStepsPage from '@/components/RenderStepsPage/RenderStepsPage'

export default async function Page({ params }: { params: { step: string } }) {
	const { step } = params

	return <RenderStepsPage step={step} />
}
