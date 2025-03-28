import { MonitorPlay, NotepadText, Trophy, Smartphone, Download } from 'lucide-react'
import SingleFeature from './SingleFeature/SingleFeature'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
const CourseIncludes = () => {
	return (
		<div>
			<SectionTitle>This course includes:</SectionTitle>
			<div className='grid  grid-cols-1 md:grid-cols-2 gap-4'>
				<SingleFeature Icon={MonitorPlay} value='20.5 hours of video-on-demand content' />
				<SingleFeature Icon={NotepadText} value='Tasks' />
				<SingleFeature Icon={Download} value='Downloadable resources: 105' />
				<SingleFeature Icon={Smartphone} value='Access on mobile devices and TVs' />
				<SingleFeature Icon={Trophy} value='Certificate of completion' />
			</div>
		</div>
	)
}

export default CourseIncludes
