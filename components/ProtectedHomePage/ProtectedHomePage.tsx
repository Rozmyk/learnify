import ProtectedHeader from '../ProtectedHeader/ProtecetedHeader'
import { ProfileDataProps, ReviewProps } from '@/types/api'
import RecommendedCourses from '../ProtectedHeader/RecommendedCourses/RecommendedCourses'
import PromotedCourse from '../ProtectedHeader/PromotedCourse/PromotedCourse'
import PersonalizedCourse from '../ProtectedHeader/PersonalizedCourse/PersonalizedCourse'
import { createClient } from '@/utils/supabase/server'
export default async function ProtectedHomePage({ profileData }: { profileData: ProfileDataProps }) {
	const supabase = await createClient()
	const { data: courses, error: coursesError } = await supabase.from('course').select(`
        *,
        reviews(*),
        categories(*),
        profiles(*)
      `)

	if (coursesError) {
		console.error('Error fetching courses:', coursesError)
	}

	const coursesWithAvgRating = courses?.map(course => {
		const reviews = course.reviews || []
		const avgRating =
			reviews.length > 0 ? reviews.reduce((sum: number, r: ReviewProps) => sum + r.rating, 0) / reviews.length : null
		return { ...course, avgRating, reviewCount: reviews.length }
	})
	const { data: promoted, error: promotedError } = await supabase.from('promoted').select(`
        *,
        course(
          *,
          profiles:author_id(*), categories(*)
        )
      `)

	if (promotedError) {
		console.error('Error fetching promoted courses:', promotedError)
	}
	return (
		<>
			<ProtectedHeader profileData={profileData} />
			{coursesWithAvgRating && <RecommendedCourses courses={coursesWithAvgRating} />}
			{promoted && <PromotedCourse course={promoted[0]?.course} />}
			<PersonalizedCourse lastViewedCourseId={profileData.lastViewedCourseId} />
		</>
	)
}
