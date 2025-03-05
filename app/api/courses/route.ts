import { createClient } from '@/utils/supabase/server'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const supabase = await createClient()
	const { searchParams } = new URL(req.url)
	const level = searchParams.get('instructional_level')
	const language = searchParams.get('lang')
	const category = searchParams.get('category')
	const sortBy = searchParams.get('sort')
	const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined

	let query = supabase
		.from('course')
		.select(
			`*, 
            reviews(rating), 
            categories(id, name)`
		)
		.eq('categories_id', category)

	if (language) {
		query = query.eq('language', language)
	}
	if (level) {
		query = query.eq('level', level)
	}

	if (rating) {
		query = query.gte('reviews.rating', rating)
	}

	if (sortBy === 'newest') {
		query = query.order('created_at', { ascending: false })
	} else if (sortBy === 'lowest-priced') {
		query = query.order('price', { ascending: true })
	} else if (sortBy === 'highest-priced') {
		query = query.order('price', { ascending: false })
	}

	const { data, error } = await query

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 })
	}

	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
	})
}
