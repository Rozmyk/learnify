import Skeleton from '@/components/ui/skeleton'
const SingleCourseLoading = () => {
	return (
		<div className='embla__slide '>
			<Skeleton className='max-w-60 w-60 h-64' />
		</div>
	)
}
const Loading = () => {
	return (
		<>
			<SingleCourseLoading />
			<SingleCourseLoading />
			<SingleCourseLoading />
			<SingleCourseLoading />
			<SingleCourseLoading />
		</>
	)
}

export default Loading
