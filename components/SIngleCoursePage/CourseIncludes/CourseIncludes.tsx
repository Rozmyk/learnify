import { MonitorPlay, NotepadText } from 'lucide-react'
import SingleFeature from './SingleFeature/SingleFeature'
const CourseIncludes = () => {
	return (
		<div>
			<h3 className='text-2xl font-semibold mb-4'>This course includes:</h3>
			<SingleFeature Icon={MonitorPlay} value='Zadania' />
			<SingleFeature Icon={NotepadText} value='Zadania' />
		</div>
	)
}

export default CourseIncludes
