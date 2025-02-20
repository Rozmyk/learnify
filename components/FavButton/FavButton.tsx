'use client'

import { Button } from '../ui/button'
import { Heart, HeartIcon } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'

const FavButton = ({ courseId }: { courseId: string }) => {
	const [isFav, setIsFav] = useState(false)
	const [loading, setLoading] = useState(false)
	const [userId, setUserId] = useState<string | null>(null)

	const supabase = createClient()

	// Fetch user ID once
	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser()

			if (error) {
				console.error('Error fetching user:', error.message)
			}

			if (user) {
				setUserId(user.id)
			}
		}

		fetchUser()
	}, [supabase])

	const fetchFavoriteStatus = useCallback(async () => {
		if (!userId) return

		const { data, error } = await supabase
			.from('favCourses')
			.select('id')
			.eq('user_id', userId)
			.eq('course_id', courseId)
			.maybeSingle()

		if (error) {
			console.error('Error fetching favorite status:', error.message)
			return
		}

		setIsFav(!!data)
	}, [userId, courseId, supabase])

	const toggleFavorite = async () => {
		if (!userId || loading) return

		setLoading(true)

		try {
			if (isFav) {
				const { error } = await supabase.from('favCourses').delete().eq('user_id', userId).eq('course_id', courseId)

				if (error) throw error

				setIsFav(false)
			} else {
				const { error } = await supabase.from('favCourses').upsert([{ user_id: userId, course_id: courseId }])

				if (error) throw error

				setIsFav(true)
			}
		} catch (err) {
			if (err instanceof Error) {
				console.error('Error toggling favorite:', err.message)
			} else {
				console.error('Unknown error toggling favorite')
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (userId) {
			fetchFavoriteStatus()
		}
	}, [userId, fetchFavoriteStatus])

	return (
		<Button
			className='rounded-full'
			size='icon'
			variant='outline'
			onClick={toggleFavorite}
			disabled={loading}
			aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}>
			{isFav ? <Heart className='text-red-500' /> : <HeartIcon />}
		</Button>
	)
}

export default FavButton
