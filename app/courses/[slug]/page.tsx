import { createClient } from '@/utils/supabase/server'

export default async function CoursesPage({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const supabase = await createClient()

	const { data: category } = await supabase.from('categories').select('id').eq('slug', slug).single()

	if (!category) {
		return <p>Category not found</p>
	}
	console.log(category)

	const { data: courses } = await supabase.from('course').select('*').eq('categories_id', category.id)

	if (!courses || courses.length === 0) {
		return <p>No courses found for this category.</p>
	}

	return (
		<ul>
			{courses.map(course => (
				<li key={course.id}>{course.title}</li>
			))}
		</ul>
	)
}
