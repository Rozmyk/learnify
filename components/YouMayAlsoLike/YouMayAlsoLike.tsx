import { useCartStore } from '@/context/cart'
import CoursesCarousel from '../CoursesCarousel/CoursesCarousel'
import { useState, useEffect } from 'react'
import { CourseProps } from '@/types/api'

const YouMayAlsoLike = () => {
	const { cartItems } = useCartStore()
	const [filteredPosts, setFilteredPosts] = useState<CourseProps[] | null>(null)
	const currentCoursesId = [] as string[]
	cartItems.map(item => {
		currentCoursesId.push(item.product_id)
	})

	const fetchFilteredPosts = async () => {
		const response = await fetch('/api/course/filtered', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				excludedPosts: currentCoursesId,
			}),
		})

		const data = await response.json()
		if (data) {
			setFilteredPosts(data)
		}
	}
	useEffect(() => {
		fetchFilteredPosts()
	}, [cartItems, currentCoursesId])

	return filteredPosts && <CoursesCarousel courses={filteredPosts} text='You may also like' />
}

export default YouMayAlsoLike
