'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CartItemProps } from '@/types/api'
interface CartState {
	cartItems: CartItemProps[]
	loading: boolean
	hasFetchedCartItems: boolean
	fetchCart: (userId: string) => void
	toggleCartItem: (userId: string) => void
}
export const useCartStore = create<CartState>((set, get) => ({
	cartItems: [] as CartItemProps[],
	loading: true,
	hasFetchedCartItems: false,

	fetchCart: async (userId: string) => {},

	toggleCartItem: async (userId: string) => {},
}))
