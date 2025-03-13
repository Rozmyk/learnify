import userHasAccessToLesson from '@/lib/userHasAccesToLesson'
import { createClient } from '@/utils/supabase/server'
import SingleLessonPage from '@/components/SingleLessonPage/SingleLessonPage'
export default async function Page({ params }: { params: Promise<{ lessonId: string }> }) {
	const supabase = await createClient()
	const lessonId = (await params).lessonId
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (user) {
		const haveToAcces = await userHasAccessToLesson(lessonId, user.id)
	}

	return <SingleLessonPage lessonId={lessonId} />
}
