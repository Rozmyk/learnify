'use client'

import PageContainer from '@/components/PageContainer/PageContainer'
import StepOne from '@/components/CreateCourseSteps/StepOne/StepOne'
import StepTwo from '@/components/CreateCourseSteps/StepTwo/StepTwo'
import StepThree from '@/components/CreateCourseSteps/StepThree/StepThree'
import StepFour from '@/components/CreateCourseSteps/StepFour/StepFour'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loader from '../ui/loader'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'

const RenderStepsPage = ({ step }: { step: string }) => {
	const router = useRouter()
	const [canRender, setCanRender] = useState(false)
	const { completedSteps } = useCreateCourseStore()

	useEffect(() => {
		const validateStep = async () => {
			const currentStep = parseInt(step)
			if (currentStep > 1) {
				const previousStep = (currentStep - 1).toString()
				if (!completedSteps.includes(previousStep)) {
					router.push(`/course/create/${getLastCompletedStep()}`)
					return
				}
			}
			setCanRender(true)
		}

		setCanRender(false)
		validateStep()
	}, [step, completedSteps])

	const getLastCompletedStep = () => {
		if (completedSteps.length === 0) return '1'
		return completedSteps.sort().slice(-1)[0]
	}

	const renderStep = () => {
		switch (step) {
			case '1':
				return <StepOne />
			case '2':
				return <StepTwo />
			case '3':
				return <StepThree />
			case '4':
				return <StepFour />
			default:
				router.push(`/course/create/1`)
				return null
		}
	}

	return (
		<PageContainer>
			<div className='max-h-screen h-screen'>
				{!canRender ? (
					<div className='flex w-full h-full justify-center items-center'>
						<Loader />
					</div>
				) : (
					renderStep()
				)}
			</div>
		</PageContainer>
	)
}

export default RenderStepsPage
