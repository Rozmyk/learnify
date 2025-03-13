import { SingleLessonProps } from '@/types/api'

function getTotalDuration(lessons: SingleLessonProps[]) {
	const totalSeconds = lessons.reduce((acc, lesson) => {
		const [min, sec] = lesson.duration.split(':').map(Number)
		return acc + min * 60 + sec
	}, 0)

	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60

	if (hours > 0) {
		return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
	} else {
		return `${minutes}:${String(seconds).padStart(2, '0')}`
	}
}
export default getTotalDuration
