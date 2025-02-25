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
			{courses && <RecommendedCourses courses={courses} />}
			{promoted && <PromotedCourse course={promoted[0]?.course} />}
			<PersonalizedCourse lastViewedCourseId={profileData.lastViewedCourseId} />
		</>
	)
}
