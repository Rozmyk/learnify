'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CartItemProps } from '@/types/api'

interface CartState {
	cartItems: CartItemProps[]
	totalPrice: number
	loading: boolean
	hasFetchedCartItems: boolean
	fetchCart: (userId: string) => Promise<void>
	addToCart: (item: CartItemProps) => Promise<void>
	toggleCartItem: (userId: string, productId: string) => Promise<void>
	calculateTotalPrice: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
	cartItems: [],
	totalPrice: 0,
	loading: false,
	hasFetchedCartItems: false,

	calculateTotalPrice: () => {
		const { cartItems } = get()
		const total = cartItems.reduce((sum, item) => {
			const price = item.course?.price || 0
			const discount = item.course?.discount || 0
			const finalPrice = price * (1 - discount / 100)
			return sum + finalPrice * item.quantity
		}, 0)

		set({ totalPrice: parseFloat(total.toFixed(2)) })
	},

	addToCart: async (newItem: CartItemProps) => {
		set({ loading: true })
		const { cartItems, calculateTotalPrice } = get()
		const existingProductIndex = cartItems.findIndex(item => item.product_id === newItem.product_id)

		if (existingProductIndex > -1) {
			const updatedItems = [...cartItems]
			updatedItems[existingProductIndex].quantity += 1
			set({ cartItems: updatedItems, loading: false })
			calculateTotalPrice()
			return
		}

		const supabase = createClient()
		const { data, error } = await supabase.from('course').select('*').eq('id', newItem.product_id).single()

		if (error) {
			set({ loading: false })
			return
		}

		if (data) {
			const updatedItem = { ...newItem, course: data }
			set(state => ({
				cartItems: [...state.cartItems, updatedItem],
				loading: false,
			}))
			calculateTotalPrice()
		}
	},

	fetchCart: async (userId: string) => {
		set({ loading: true })

		const supabase = createClient()
		const { data, error } = await supabase.from('cart').select('*').eq('user_id', userId)

		if (error) {
			set({ loading: false })
			return
		}

		set({ cartItems: data, hasFetchedCartItems: true, loading: false })
		get().calculateTotalPrice()
	},

	toggleCartItem: async (userId: string, productId: string) => {
		const { cartItems, calculateTotalPrice } = get()
		const updatedItems = cartItems.filter(item => item.product_id !== productId)

		const supabase = createClient()
		const { error } = await supabase.from('cart').delete().eq('user_id', userId).eq('product_id', productId)

		if (error) {
			return
		}

		set({ cartItems: updatedItems })
		calculateTotalPrice()
	},
}))
