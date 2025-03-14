import userHasAccessToLesson from '@/lib/userHasAccesToLesson'
import { createClient } from '@/utils/supabase/server'
import SingleLessonPage from '@/components/SingleLessonPage/SingleLessonPage'
import { redirect } from 'next/navigation'
export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
	const supabase = await createClient()
	const lessonId = (await params).lessonId
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/')
	}

	const haveToAcces = await userHasAccessToLesson(lessonId, user.id)
	if (!haveToAcces) {
		redirect('/')
	}

	return <SingleLessonPage lessonId={lessonId} />
}
