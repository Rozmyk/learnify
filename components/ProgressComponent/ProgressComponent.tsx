import * as Progress from '@radix-ui/react-progress'

const ProgressComponent = ({ value }: { value: number }) => {
	return (
		<Progress.Root className='relative overflow-hidden bg-primary rounded-full w-full h-0.5'>
			<Progress.Indicator className='bg-purple-300 h-full transition-all duration-300' style={{ width: `${value}%` }} />
		</Progress.Root>
	)
}

export default ProgressComponent
