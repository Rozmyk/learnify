import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params
	const supabase = await createClient()

	try {
		const { data, error } = await supabase
			.from('course')
			.select(
				`
              *,
              reviews(*),
              categories(*),
              profiles(*)
            `
			)
			.eq('id', id)
			.single()

		if (error) {
			return new Response(JSON.stringify({ error: error.message }), { status: 500 })
		}

		return new Response(JSON.stringify(data), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), { status: 500 })
	}
}
