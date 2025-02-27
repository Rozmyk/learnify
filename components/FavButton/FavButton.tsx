'use client'

import { Button } from '../ui/button'
import { Heart, HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useWishlistStore } from '@/context/wishlist'

const FavButton = ({
	courseId,
	variant,
}: {
	courseId: string
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined
}) => {
	const supabase = createClient()
	const [userId, setUserId] = useState<string | null>(null)
	const { favorites, fetchFavorites, toggleFavorite } = useWishlistStore()

	const isFav = favorites.find(course => course.id === courseId)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const {
					data: { user },
					error,
				} = await supabase.auth.getUser()

				if (error) {
					console.error('Error fetching user:', error.message)
					return
				}

				if (user) {
					setUserId(user.id)
					fetchFavorites()
				}
			} catch (err) {
				console.error('Error fetching user:', err)
			}
		}

		fetchUser()
	}, [supabase, fetchFavorites])

	const handleClick = () => {
		if (userId) {
			toggleFavorite(courseId)
		}
	}

	return (
		<Button
			className='rounded-full'
			size='icon'
			variant={variant ?? 'outline'}
			onClick={handleClick}
			aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}>
			{isFav ? <Heart className='text-red-400' /> : <HeartIcon />}
		</Button>
	)
}

export default FavButton
