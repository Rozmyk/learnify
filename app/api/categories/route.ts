import { createClient } from '@/utils/supabase/server'

export async function GET() {
	const supabase = await createClient()

	try {
		const { data, error } = await supabase.from('categories').select('*')

		if (error) {
			return new Response(JSON.stringify({ error: error.message }), { status: 500 })
		}

		return new Response(JSON.stringify(data), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), { status: 500 })
	}
}
