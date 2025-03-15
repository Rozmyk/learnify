'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { ownedCourseProps } from '@/types/api'

interface OwnedCoursesState {
	owned: ownedCourseProps[]
	loading: boolean
	fetchOwned: () => Promise<void>
	hasFetchedOwnedCourses: boolean
}

export const useOwnedCoursesStore = create<OwnedCoursesState>((set, get) => ({
	owned: [],
	loading: true,
	hasFetchedOwnedCourses: false,

	fetchOwned: async () => {
		const { hasFetchedOwnedCourses } = get()
		if (hasFetchedOwnedCourses) return

		const supabase = await createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()
		if (!user) {
			set({ loading: false })
			return
		}

		const { data, error } = await supabase
			.from('owned_courses')
			.select('*, course(*, profiles(*), user_lessons_progress(*), lessons(*))')
			.eq('user_id', user.id)

		if (error) {
			console.log(error)
			return
		}

		set({
			owned: data,
			loading: false,
		})
	},
}))
