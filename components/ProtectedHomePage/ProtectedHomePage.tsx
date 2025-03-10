import ProtectedHeader from '../ProtectedHeader/ProtecetedHeader'
import { ProfileDataProps, ReviewProps } from '@/types/api'
import RecommendedCourses from '../ProtectedHeader/RecommendedCourses/RecommendedCourses'
import PromotedCourse from '../ProtectedHeader/PromotedCourse/PromotedCourse'
import PersonalizedCourse from '../ProtectedHeader/PersonalizedCourse/PersonalizedCourse'
import BegginerCourses from '../ProtectedHeader/BegginerCourses/BegginerCourses'
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

	return (
		<>
			<ProtectedHeader profileData={profileData} />
			{courses && <RecommendedCourses courses={courses} />}
			<PromotedCourse />
			<PersonalizedCourse lastViewedCourseId={profileData.lastViewedCourseId} />
			<BegginerCourses />
		</>
	)
}
