import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProgressComponent from '@/components/ProgressComponent/ProgressComponent'

const Topbar = ({ step, totalSteps }: { step: number; totalSteps: number }) => {
	return (
		<div className='border-b border-border  h-16 max-h-16 w-full'>
			<div className='flex justify-between items-center p-4 h-full'>
				<div className='flex justify-start items-center gap-8'>
					<Link className='text-xl font-semibold' href={'/'}>
						Learnify
					</Link>
					<p className=' text-muted-foreground '>
						Step {step} of {totalSteps}
					</p>
				</div>
				<Link href='/instructor/courses'>
					<Button>Close</Button>
				</Link>
			</div>
			<ProgressComponent value={Number(step) * (100 / totalSteps)} className='h-1' />
		</div>
	)
}

export default Topbar
