import LessonsSidebar from '@/components/SingleLessonPage/LessonsSiderbar/LessonsSidebar'
import CourseDetails from '@/components/SingleLessonPage/CourseDetails/CourseDetails'
export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ lessonId: string; slug: string }>
}) {
	const courseSlug = (await params).slug

	return (
		<div className=' flex md:flex-row flex-col justify-between items-start'>
			<div className='w-full h-full  '>
				{children}
				<CourseDetails courseSlug={courseSlug} />
			</div>
			<div className=' md:max-w-[420px] w-full h-screen bg-background relative '>
				<LessonsSidebar courseSlug={courseSlug} courseId={courseSlug} />
			</div>
		</div>
	)
}
