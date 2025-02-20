import { createClient } from '@/utils/supabase/server'

export default async function CoursesPage({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const supabase = await createClient()

	const { data: category } = await supabase.from('categories').select('*').eq('slug', slug).single()
	if (!category) {
		return <p>Category not found</p>
	}

	const { data: courses } = await supabase.from('course').select('*').eq('categories_id', category.id)

	if (!courses || courses.length === 0) {
		return <p>No courses found for this category.</p>
	}

	return (
		<>
			<h1 className='text-4xl font-semibold mt-8'>Courses from the {category.name} category</h1>
			<h2>Starting courses</h2>
			<p>Discover courses created by experts with practical experience.</p>

			<ul>
				{courses.map(course => (
					<li key={course.id}>{course.title}</li>
				))}
			</ul>
		</>
	)
}
