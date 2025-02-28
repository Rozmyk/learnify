import { MonitorPlay, NotepadText, Trophy, Smartphone, Download } from 'lucide-react'
import SingleFeature from './SingleFeature/SingleFeature'
const CourseIncludes = () => {
	return (
		<div>
			<h3 className='text-2xl font-semibold mb-4'>This course includes:</h3>
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
