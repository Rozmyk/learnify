'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'

const Bottombar = ({ step }: { step: number }) => {
	const { isStepValid, completedSteps } = useCreateCourseStore()
	const router = useRouter()

	const isNextStepAvailable = step > 1 ? completedSteps.includes((step - 1).toString()) : true

	const handleRedirect = () => {
		router.push(`/course/create/${step + 1}`)
	}

	const areAllStepsValid = () => {
		for (let i = 1; i <= 4; i++) {
			if (!isStepValid(i)) {
				return false
			}
		}
		return true
	}

	const isContinueDisabled = !isStepValid(step) || !isNextStepAvailable

	return (
		<div className='border-t border-border w-full max-h-16 h-16'>
			<div className='flex justify-between items-center p-4 h-full'>
				{step > 1 && (
					<Link href={`/course/create/${step - 1}`}>
						<Button variant='outline'>Back</Button>
					</Link>
				)}
				{step === 4 ? (
					<Button
						disabled={!areAllStepsValid()}
						onClick={() => {
							if (areAllStepsValid()) {
								console.log('course create')
							} else {
								console.log('Not all steps are valid')
							}
						}}>
						Create course
					</Button>
				) : (
					<Button onClick={handleRedirect} disabled={isContinueDisabled}>
						Continue
					</Button>
				)}
			</div>
		</div>
	)
}

export default Bottombar
