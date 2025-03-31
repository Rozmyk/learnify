import { CourseProps } from '@/types/api'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const level = searchParams.get('instructional_level')
	const language = searchParams.get('lang')
	const title = searchParams.get('title')
	const author_id = searchParams.get('author_id')
	const category = searchParams.get('category')
	const sortBy = searchParams.get('sort')
	const status = searchParams.get('status') ?? 'published'
	const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined

	let query = supabase
		.from('course')
		.select(
			`*, 
            reviews(rating), 
            categories(id, name), profiles(*)`
		)
		.order('created_at', { ascending: false })

	if (language) {
		query = query.eq('language', language)
	}
	if (author_id) {
		query = query.eq('author_id', author_id)
	}
	if (level) {
		query = query.eq('level', level)
	}
	if (status) {
		query = query.eq('status', status)
	}

	if (category) {
		query = query.eq('categories_id', category)
	}
	if (title) {
		query = query.ilike('title', `%${title}%`)
	}

	// if (rating) {
	// 	const { data: avgRatingData, error: avgRatingError } = await supabase.rpc<CourseProps[]>(
	// 		'get_courses_by_avg_rating',
	// 		{
	// 			min_rating: rating,
	// 		}
	// 	)

	// 	if (avgRatingError) {
	// 		return NextResponse.json({ error: avgRatingError.message }, { status: 500 })
	// 	}

	// 	const filteredCourseIds = avgRatingData?.map((course: CourseProps) => course.id) ?? []

	// 	if (filteredCourseIds.length > 0) {
	// 		query = query.in('id', filteredCourseIds)
	// 	} else {
	// 		return NextResponse.json([], {
	// 			headers: { 'Content-Type': 'application/json' },
	// 			status: 200,
	// 		})
	// 	}
	// }

	if (sortBy === 'newest') {
		query = query.order('created_at', { ascending: false })
	} else if (sortBy === 'lowest-priced') {
		query = query.order('price', { ascending: true })
	} else if (sortBy === 'highest-priced') {
		query = query.order('price', { ascending: false })
	}

	const { data, error } = await query

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json(data, {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
	})
}
