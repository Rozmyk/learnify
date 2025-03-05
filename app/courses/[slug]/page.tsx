import { createClient } from '@/utils/supabase/server'
import SingleCategoryPage from '@/components/SingleCategoryPage/SingleCategoryPage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
		return (
			<div className='p-8 my-8 flex flex-col justify-center items-center border border-border rounded-lg gap-4'>
				<p>No courses found for this category.</p>
				<Link href='/'>
					<Button>Home</Button>
				</Link>
			</div>
		)
	}

	return <SingleCategoryPage courses={courses} category={category} slug={slug} />
}
