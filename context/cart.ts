'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CartItemProps } from '@/types/api'
interface CartState {
	cartItems: string[]
	loading: boolean
	hasFetchedCartItems: boolean
	fetchCart: (userId: string) => void
	addToCart: (itemId: string) => void
	addQuanitity: (itemId: string) => void
	toggleCartItem: (userId: string) => void
}
export const useCartStore = create<CartState>((set, get) => ({
	cartItems: [] as string[],
	loading: true,
	hasFetchedCartItems: false,

	addToCart: async (itemId: string) => {
		const { cartItems, addQuanitity } = get()
		const isExist = cartItems.some(item => item === itemId)
		if (isExist) {
			addQuanitity(itemId)
		} else {
			const updatedCart = [...cartItems, itemId]
			set({ cartItems: updatedCart })
		}
	},
	addQuanitity: async (itemId: string) => {},
	fetchCart: async (userId: string) => {},

	toggleCartItem: async (userId: string) => {},
}))
