'use client'
import PageWrapper from '../../PageWrapper/PageWrapper'
import CourseTitleInput from '../../components/CourseTitleInput/CourseTitleInput'
import { useState } from 'react'
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor'
import { Label } from '@/components/ui/label'
import CourseImageInput from './components/CourseImageInput/CourseImageInput'
import { CourseProps } from '@/types/api'
import BasicInfo from './components/BasicInfo/BasicInfo'
interface DataProps {
	title: string
	subtitle: string
}
const BasicPage = ({ courseId, courseData }: { courseId: string; courseData: CourseProps }) => {
	const [data, setData] = useState<DataProps>({
		title: courseData.title,
		subtitle: '',
	})

	return (
		<PageWrapper title='Course landing page'>
			<p className='text-muted-foreground mb-10'>
				A course landing page is the key to success on Learnify. If you use it well, your course can be more visible on
				search engines like Google. As you finish this section, think about creating an interesting course landing page
				that shows why someone would sign up for your course. Learn more about creating a course landing page and
				standards for course titling.
			</p>

			<CourseTitleInput
				maxLength={60}
				onChange={e => setData({ ...data, title: e.target.value })}
				value={data.title}
				placeholder='Insert the title of your course'
				description='The title should attract attention, be informative and well optimized for search.'
				label='Course title'
			/>

			<CourseTitleInput
				onChange={e => setData({ ...data, subtitle: e.target.value })}
				maxLength={120}
				value={data.subtitle}
				placeholder='Insert the subtitle of your course'
				description='Use one or two related keywords and list 3-4 key areas that the course covers.'
				label='Course subtitle'
			/>

			<RichTextEditor
				courseDescription={courseData.description}
				description='The description should be at least 200 words.'
			/>
			<BasicInfo />
			<CourseImageInput courseImage={courseData.thumbnail} courseId={courseId} />
		</PageWrapper>
	)
}

export default BasicPage
