import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const supabase = await createClient()
	try {
		const { searchParams } = new URL(req.url)
		const userId = searchParams.get('userId')

		if (!userId) {
			return NextResponse.json({ message: 'Missing user ID' }, { status: 400 })
		}

		const { data: courses, error: coursesError } = await supabase.from('course').select('id').eq('author_id', userId)

		if (coursesError) {
			return NextResponse.json({ message: 'Error fetching courses', error: coursesError }, { status: 500 })
		}

		const courseIds = courses.map(course => course.id)

		const { data: reviews, error: reviewsError } = await supabase
			.from('reviews')
			.select('rating')
			.in('course_id', courseIds)

		if (reviewsError) {
			return NextResponse.json({ message: 'Error fetching reviews', error: reviewsError }, { status: 500 })
		}

		const reviewsCount = reviews.length

		const averageRating = reviewsCount > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount : 0

		return NextResponse.json({ coursesCount: courses.length, reviewsCount, averageRating }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: 'An unexpected error occurred', error }, { status: 500 })
	}
}

export const getUserCourseStats = GET
