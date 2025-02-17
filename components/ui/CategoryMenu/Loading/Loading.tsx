import Skeleton from '../../skeleton'
const Loading = () => {
	return (
		<>
			{Array.from({ length: 10 }).map((_, index) => (
				<Skeleton key={index} className={`h-6 w-14`} />
			))}
		</>
	)
}

export default Loading
