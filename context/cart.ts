'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CartItemProps } from '@/types/api'
interface cartState {
	cartItems: CartItemProps[]
	loading: boolean
	hasFetchedCartItems: boolean
	fetchCart: (userId: string) => void
	toggleCartIem: (userId: string) => void
}
export const useCartStore = create((set, get) => ({
	cartItems: [] as CartItemProps[],
	loading: true,
	hasFetchedCartItems: false,

	fetchCart: async (userId: string) => {},

	toggleCartItem: async (userId: string) => {},
}))
