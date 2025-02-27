import { formatDistanceToNow } from 'date-fns'

function timeAgo(timestamp: string) {
	const date = new Date(timestamp)
	return formatDistanceToNow(date, { addSuffix: true })
}

export default timeAgo
