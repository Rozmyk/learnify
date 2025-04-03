import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const level_id = searchParams.get('instructional_level')
	const language_id = searchParams.get('lang')
	const title = searchParams.get('title')
	const author_id = searchParams.get('author_id')
	const category_id = searchParams.get('category_id')
	const sortBy = searchParams.get('sort')
	const status = searchParams.get('status') ?? 'published'
	const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined

	let query = supabase
		.from('course')
		.select(
			`*, 
            reviews(rating), 
            categories(id, name), profiles(*), currencies(*),levels(*), prices(*), languages(*)`
		)
		.order('created_at', { ascending: false })

	if (language_id) {
		query = query.eq('language_id', language_id)
	}
	if (author_id) {
		query = query.eq('author_id', author_id)
	}
	if (level_id) {
		query = query.eq('level_id', level_id)
	}
	if (status) {
		query = query.in('status', ['published', 'draft', 'archived'])
	}

	if (category_id) {
		query = query.eq('categories_id', category_id)
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
