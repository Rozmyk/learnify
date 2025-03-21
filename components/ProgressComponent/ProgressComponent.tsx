import * as Progress from '@radix-ui/react-progress'
import { clsx } from 'clsx'

interface ProgressComponentProps {
	value: number
	className?: string
}

const ProgressComponent = ({ value, className }: ProgressComponentProps) => {
	return (
		<Progress.Root
			className={clsx('relative overflow-hidden bg-muted-foreground rounded-full w-full h-0.5', className)}>
			<Progress.Indicator className='bg-purple-300 h-full transition-all duration-300' style={{ width: `${value}%` }} />
		</Progress.Root>
	)
}

export default ProgressComponent
