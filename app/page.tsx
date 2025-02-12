import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import RecommendedCourses from '@/components/ProtectedHeader/RecommendedCourses/RecommendedCourses'
import ProtectedHeader from '@/components/ProtectedHeader/ProtecetedHeader'
import { ReviewProps } from '@/types/api'
export default async function Home() {
	const supabase = await createClient()
	const { data: courses, error } = await supabase.from('course').select(`
    *,
    reviews(*)
  `)

	if (error) console.error(error)

	const coursesWithAvgRating = courses?.map(course => {
		const reviews = course.reviews || []
		const avgRating =
			reviews.length > 0 ? reviews.reduce((sum: number, r: ReviewProps) => sum + r.rating, 0) / reviews.length : null
		return { ...course, avgRating, reviewCount: reviews.length }
	})

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/sign-in')
	}
	return (
		<>
			<main className='flex-1 flex flex-col gap-6 h-screen p-4'>
				<ProtectedHeader />
				{coursesWithAvgRating && <RecommendedCourses courses={coursesWithAvgRating} />}
			</main>
		</>
	)
}
