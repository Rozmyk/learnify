import { createClient } from '@/utils/supabase/server'

export async function GET() {
	const supabase = await createClient()

	try {
		const { data: categories, error: categoriesError } = await supabase.from('categories').select('*')

		if (categoriesError) {
			return new Response(JSON.stringify({ error: categoriesError.message }), { status: 500 })
		}

		const categoriesWithCount = await Promise.all(
			categories.map(async (category: { id: number }) => {
				const { count, error: countError } = await supabase
					.from('course')
					.select('id', { count: 'exact' })
					.eq('categories_id', category.id)

				if (countError) {
					return { ...category, courseCount: 0 }
				}

				return { ...category, courseCount: count }
			})
		)

		return new Response(JSON.stringify(categoriesWithCount), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), { status: 500 })
	}
}
