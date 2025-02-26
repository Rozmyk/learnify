function formatTimestamp(timestamp: string) {
	const date = new Date(timestamp)

	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	return `${month}.${year}`
}
export default formatTimestamp
