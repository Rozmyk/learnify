'use client'
import PageWrapper from '../../PageWrapper/PageWrapper'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
const MessagesPage = () => {
	const { temporaryData, setTemporaryData } = useCreateCourseStore()
	return (
		<PageWrapper title='Messages'>
			<p className='text-muted-foreground mb-10'>
				Write messages to your course participants (optional) that will be sent automatically when they join or complete
				a course to increase their engagement. If you do not want to send welcome or congratulatory messages, do not
				enter anything in this field.
			</p>
			<RichTextEditor
				value={temporaryData.welcome_message ?? ''}
				onChange={e => setTemporaryData({ ...temporaryData, welcome_message: e })}
				title='Welcome message'
				maxLength={1000}
			/>
			<RichTextEditor
				title='Congratulatory message'
				maxLength={1000}
				value={temporaryData.congratulatory_message ?? ''}
				onChange={e => setTemporaryData({ ...temporaryData, congratulatory_message: e })}
			/>
		</PageWrapper>
	)
}

export default MessagesPage
