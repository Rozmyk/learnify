import { createClient } from '@/utils/supabase/server'
import AddCourse from '@/components/AddCourse/AddCourse'
export default async function page() {
	const handleAddNewCourse = async ({ formData }) => {
		const title = formData.title
		const description = formData.description
		const price = formData.price
		const thumbnail = formData.thumbnail
		const id = 'sdasddsada'

		const supabase = await createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		const { data, error: insertError } = await supabase.from('course').insert([
			{
				title,
				id,
				description,
				price,
				thumbnail,
				author_id: user.id,
				createdAt: new Date().toISOString(),
			},
		])

		if (insertError) {
			console.log(insertError)
		}
	}

	return <AddCourse />
}
