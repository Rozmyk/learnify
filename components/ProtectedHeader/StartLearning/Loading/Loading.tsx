import Skeleton from '@/components/ui/skeleton'
const SingleLessonLoading = () => {
	return (
		<div className='embla__slide '>
			<Skeleton className=' h-40' />
		</div>
	)
}
const Loading = () => {
	return (
		<>
			<SingleLessonLoading />
			<SingleLessonLoading />
			<SingleLessonLoading />
			<SingleLessonLoading />
			<SingleLessonLoading />
		</>
	)
}

export default Loading
