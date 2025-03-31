'use client'
import PageWrapper from '../../PageWrapper/PageWrapper'
import CourseTitleInput from '../../components/CourseTitleInput/CourseTitleInput'
import RichTextEditor from '../../../RichTextEditor/RichTextEditor'
import Loader from '@/components/ui/loader'
import CourseImageInput from './components/CourseImageInput/CourseImageInput'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import BasicInfo from './components/BasicInfo/BasicInfo'

const BasicPage = () => {
	const { setTemporaryData, temporaryData, loading } = useCreateCourseStore()

	return (
		<PageWrapper title='Course landing page'>
			<p className='text-muted-foreground mb-10'>
				A course landing page is the key to success on Learnify. If you use it well, your course can be more visible on
				search engines like Google. As you finish this section, think about creating an interesting course landing page
				that shows why someone would sign up for your course. Learn more about creating a course landing page and
				standards for course titling.
			</p>

			{!loading ? (
				<>
					<CourseTitleInput
						maxLength={60}
						onChange={e => setTemporaryData({ ...temporaryData, title: e.target.value })}
						value={temporaryData.title ?? ''}
						placeholder='Insert the title of your course'
						description='The title should attract attention, be informative and well optimized for search.'
						label='Course title'
					/>

					<CourseTitleInput
						onChange={e => setTemporaryData({ ...temporaryData, subtitle: e.target.value })}
						maxLength={120}
						value={temporaryData.subtitle ?? ''}
						placeholder='Insert the subtitle of your course'
						description='Use one or two related keywords and list 3-4 key areas that the course covers.'
						label='Course subtitle'
					/>

					<RichTextEditor
						title='Course description'
						value={temporaryData.description ?? ''}
						onChange={e => setTemporaryData({ ...temporaryData, description: e })}
						description='The description should be at least 200 words.'
					/>
					<BasicInfo />
					<CourseImageInput />
				</>
			) : (
				<div className='w-full py-10 flex justify-center items-center'>
					<Loader />
				</div>
			)}
		</PageWrapper>
	)
}

export default BasicPage
