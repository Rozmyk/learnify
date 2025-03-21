import PageContainer from '@/components/PageContainer/PageContainer'
import StepOne from '@/components/CreateCourseSteps/StepOne/StepOne'
import StepTwo from '@/components/CreateCourseSteps/StepTwo/StepTwo'
import StepThree from '@/components/CreateCourseSteps/StepThree/StepThree'
export default async function Page({ params }: { params: Promise<{ step: string }> }) {
	const step = (await params).step
	return (
		<div className='flex flex-col max-w-7xl  min-h-screen max-h-screen gap-20 w-full mx-auto p-4'>
			<StepOne />
		</div>
	)
}
