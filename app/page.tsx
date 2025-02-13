import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import RecommendedCourses from '@/components/ProtectedHeader/RecommendedCourses/RecommendedCourses'
import PromotedCourse from '@/components/ProtectedHeader/PromotedCourse/PromotedCourse'
import ProtectedHeader from '@/components/ProtectedHeader/ProtecetedHeader'
import { ReviewProps, ProfileDataProps } from '@/types/api'

export default async function Home() {
	const supabase = await createClient()

	const { data: courses, error: coursesError } = await supabase.from('course').select(`
    *,
    reviews(*),
    categories(*)
  `)

	if (coursesError) {
		console.error('Błąd podczas pobierania kursów:', coursesError)
	}

	const coursesWithAvgRating = courses?.map(course => {
		const reviews = course.reviews || []
		const avgRating =
			reviews.length > 0 ? reviews.reduce((sum: number, r: ReviewProps) => sum + r.rating, 0) / reviews.length : null
		return { ...course, avgRating, reviewCount: reviews.length }
	})

	const { data: promoted, error: promotedError } = await supabase.from('promoted').select(`
    *,
    course(*)
  `)

	if (promotedError) {
		console.error('Błąd podczas pobierania promowanych kursów:', promotedError)
	}

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/sign-in')
	}

	let profileData: ProfileDataProps | null = null
	let profileError: Error | null = null
	const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

	if (error) {
		profileError = error
		console.error('Błąd podczas pobierania danych profilu:', profileError)
	} else {
		profileData = data
		console.log('Dane użytkownika:', profileData)
	}

	return (
		<>
			<main className='flex-1 flex flex-col gap-6 h-screen p-4'>
				{profileData && <ProtectedHeader profileData={profileData} />}
				{coursesWithAvgRating && <RecommendedCourses courses={coursesWithAvgRating} />}
				{promoted && <PromotedCourse course={promoted[0]?.course} />}
			</main>
		</>
	)
}
