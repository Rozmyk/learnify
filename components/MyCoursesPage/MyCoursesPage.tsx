'use client'
import SinglePurchasedCourse from '../SinglePurchasedCourse/SinglePurchasedCourse'
import { useOwnedCoursesStore } from '@/context/ownedCourses'
import Loader from '../ui/loader'
const MyCoursesPage = () => {
	const { owned, loading } = useOwnedCoursesStore()
	return loading ? (
		<div className='flex justify-center items-center w-full h-full py-8'>
			<Loader />
		</div>
	) : (
		<div className='grid  grid-cols-1 md:grid-cols-4 gap-8 min-h-screen'>
			{owned &&
				owned.map(item => {
					return <SinglePurchasedCourse {...item.course} key={item.id} />
				})}
		</div>
	)
}

export default MyCoursesPage
