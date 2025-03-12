'use client'
import Loader from '../ui/loader'

const SingleLessonPage = ({ lessonId }: { lessonId: string | null }) => {
	return (
		<div className='w-full h-full flex justify-center items-center py-8'>
			<Loader />
		</div>
	)
}

export default SingleLessonPage
