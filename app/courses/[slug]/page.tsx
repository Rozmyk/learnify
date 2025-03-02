import { createClient } from '@/utils/supabase/server'
import SingleCategoryPage from '@/components/SingleCategoryPage/SingleCategoryPage'

export default async function CoursesPage({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const supabase = await createClient()

	const { data: category } = await supabase.from('categories').select('*').eq('slug', slug).single()
	if (!category) {
		return <p>Category not found</p>
	}

	const { data: courses } = await supabase
		.from('course')
		.select('*, profiles(*), categories(*), reviews(*)')
		.eq('categories_id', category.id)

	if (!courses || courses.length === 0) {
		return <p>No courses found for this category.</p>
	}

	return <SingleCategoryPage courses={courses} category={category} slug={slug} />
}
