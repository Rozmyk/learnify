import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import userHasAccessToCourse from '@/lib/userHasAccesToCourse'
import lastViewedLesson from '@/lib/lastViewedLesson'
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const supabase = await createClient()
	const slug = (await params).slug
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}

	const hasAcces = await userHasAccessToCourse(slug)
	if (!hasAcces) {
		redirect('/')
	}
	const lastLesson = await lastViewedLesson(slug)
	if (!lastLesson) {
		redirect('/')
	} else {
		redirect(`/course/${slug}/learn/${lastLesson}`)
	}
}
