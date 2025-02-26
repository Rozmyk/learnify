import { Check } from 'lucide-react'
const SingleLessonPoint = ({ value }: { value: string }) => {
	return (
		<div className='flex justify-start items-start gap-2 text-muted-foreground mb-1'>
			<div>
				<Check size={16} />{' '}
			</div>
			<p className='text-sm'>{value}</p>
		</div>
	)
}

export default SingleLessonPoint
