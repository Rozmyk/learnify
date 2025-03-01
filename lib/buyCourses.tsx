export const buyCourses = async (userId: string, courseIds: string[]) => {
	const response = await fetch('/api/purchase', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userId, courseIds }),
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.error)
	}

	return data
}
