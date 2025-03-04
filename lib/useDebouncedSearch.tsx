import { useState, useEffect } from 'react'
import { CourseProps } from '@/types/api'

const useDebouncedSearch = (inputValue: string, delay: number = 300) => {
	const [courses, setCourses] = useState<CourseProps[] | null>(null)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		if (inputValue.trim().length < 2) {
			setCourses([])
			return
		}

		const fetchCourses = async () => {
			setLoading(true)
			try {
				const res = await fetch(`/api/course/search?q=${inputValue}`)
				const data = await res.json()
				setCourses(data.courses)
				setLoading(false)
			} catch (error) {
				console.error('Błąd podczas wyszukiwania:', error)
			}
		}

		const debounce = setTimeout(fetchCourses, delay)

		return () => clearTimeout(debounce)
	}, [inputValue, delay])

	return { courses, loading }
}

export default useDebouncedSearch
