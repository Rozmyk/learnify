import LessonsSidebar from '@/components/SingleLessonPage/LessonsSiderbar/LessonsSidebar'
import CourseDetails from '@/components/SingleLessonPage/CourseDetails/CourseDetails'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ lessonId: string; slug: string }>
}) {
	const courseSlug = (await params).slug

	return (
		<div className='flex md:flex-row flex-col-reverse justify-between items-start'>
			<div className='w-full h-full'>
				{children}

				<div className='md:hidden block'>
					<Tabs defaultValue='lessons' className='w-full mt-4'>
						<TabsList className='flex border-b border-border'>
							<TabsTrigger
								value='lessons'
								className='flex-1 p-2 text-center font-semibold relative data-[state=active]:after:content-[""] data-[state=active]:after:absolute data-[state=active]:after:left-1/2 data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:bottom-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-20 data-[state=active]:after:bg-white'>
								Channel content
							</TabsTrigger>
							<TabsTrigger
								value='details'
								className='flex-1 p-2 text-center font-semibold relative data-[state=active]:after:content-[""] data-[state=active]:after:absolute data-[state=active]:after:left-1/2 data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:bottom-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-20 data-[state=active]:after:bg-white'>
								Overview
							</TabsTrigger>
						</TabsList>

						<TabsContent value='lessons' className='pt-4'>
							<LessonsSidebar courseSlug={courseSlug} courseId={courseSlug} />
						</TabsContent>
						<TabsContent value='details' className='pt-4'>
							<CourseDetails courseSlug={courseSlug} />
						</TabsContent>
					</Tabs>
				</div>

				<div className='hidden md:block'>
					<CourseDetails courseSlug={courseSlug} />
				</div>
			</div>

			<div className='hidden md:block md:max-w-[420px] w-full md:h-screen bg-background relative'>
				<LessonsSidebar courseSlug={courseSlug} courseId={courseSlug} />
			</div>
		</div>
	)
}
