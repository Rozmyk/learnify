'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CourseProps } from '@/types/api'

interface OwnedCoursesState {
	owned: CourseProps[]
	loading: boolean
	fetchOwned: () => Promise<void>
	hasFetchedOwnedCourses: boolean
}

export const useOwnedCoursesStore = create<OwnedCoursesState>((set, get) => ({
	owned: [] as CourseProps[],
	loading: true,
	hasFetchedOwnedCourses: false,

	fetchOwned: async () => {},
}))
