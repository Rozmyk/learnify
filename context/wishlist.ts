'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CourseProps } from '@/types/api'

interface WishlistState {
	favorites: CourseProps[]
	loading: boolean
	fetchFavorites: (userId: string) => Promise<void>
	toggleFavorite: (userId: string, courseId: string) => Promise<void>
	hasFetchedFavorites: boolean
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
	favorites: [] as CourseProps[],
	loading: true,
	hasFetchedFavorites: false,

	fetchFavorites: async userId => {
		const { hasFetchedFavorites } = get()
		if (hasFetchedFavorites) return

		const supabase = createClient()

		const { data: favCourses, error } = (await supabase
			.from('favCourses')
			.select('course(*, profiles(*))')
			.eq('user_id', userId)) as { data: { course: CourseProps }[] | null; error: any }

		if (error) {
			console.error('Error fetching favorites:', error.message)
			return
		}

		const coursesWithFavorites: CourseProps[] | undefined = favCourses?.map(fav => fav.course)

		set({ favorites: coursesWithFavorites || [], loading: false, hasFetchedFavorites: true })
	},

	toggleFavorite: async (userId, courseId) => {
		const supabase = createClient()
		const { favorites } = get()

		const isFavorite = favorites.some(fav => fav.id === courseId)

		if (isFavorite) {
			const { error } = await supabase.from('favCourses').delete().eq('user_id', userId).eq('course_id', courseId)

			if (error) {
				console.error('Error removing favorite:', error.message)
				return
			}

			set({ favorites: favorites.filter(fav => fav.id !== courseId) })
		} else {
			const { error } = await supabase.from('favCourses').insert([{ user_id: userId, course_id: courseId }])

			if (error) {
				console.error('Error adding favorite:', error.message)
				return
			}

			const { data: newCourse } = await supabase
				.from('course')
				.select('*, reviews(*), categories(*), profiles(*)')
				.eq('id', courseId)
				.single()

			if (newCourse) {
				set({ favorites: [...favorites, newCourse] })
			}
		}
	},
}))
