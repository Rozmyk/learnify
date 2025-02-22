'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CourseProps } from '@/types/api'

export const useCartStore = create((set, get) => ({
	cartItems: [] as CourseProps[],
	loading: true,
	hasFetchedCartItems: false,

	fetchCart: async (userId: string) => {},

	toggleCartItem: async (userId: string, courseId: string) => {},
}))
