export const buyCourses = async (courseIds: string[]) => {
	const response = await fetch('/api/purchase', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ courseIds }),
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.error)
	}

	return data
}
