'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CartItemProps } from '@/types/api'

interface CartState {
	cartItems: CartItemProps[]
	totalPrice: number
	loading: boolean
	hasFetchedCartItems: boolean
	fetchCart: () => Promise<void>
	addToCart: (item: CartItemProps) => Promise<void>
	removeFromCart: (productId: string) => Promise<void>
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
			return sum + finalPrice
		}, 0)

		set({ totalPrice: parseFloat(total.toFixed(2)) })
	},

	addToCart: async (newItem: CartItemProps) => {
		set({ loading: true })
		const { cartItems, calculateTotalPrice } = get()
		const supabase = await createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user?.id) {
			set({ loading: false })
			return
		}

		const alreadyInCart = cartItems.some(item => item.product_id === newItem.product_id)

		if (alreadyInCart) {
			set({ loading: false })
			return
		}

		const { data, error } = await supabase.from('course').select('*, profiles(*)').eq('id', newItem.product_id).single()

		if (error) {
			set({ loading: false })
			return
		}

		if (data && user) {
			const updatedItem = { ...newItem, course: data, user_id: user.id }
			set(state => ({
				cartItems: [...state.cartItems, updatedItem],
				loading: false,
			}))
			calculateTotalPrice()
		}
	},

	removeFromCart: async (productId: string) => {
		set({ loading: true })
		const { cartItems, calculateTotalPrice } = get()
		const supabase = await createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user?.id) {
			set({ loading: false })
			return
		}

		const updatedItems = cartItems.filter(item => item.product_id !== productId)

		const { error } = await supabase.from('cart').delete().eq('user_id', user.id).eq('product_id', productId)

		if (error) {
			set({ loading: false })
			return
		}

		set({ cartItems: updatedItems, loading: false })
		calculateTotalPrice()
	},

	fetchCart: async () => {
		set({ loading: true })

		const supabase = await createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user?.id) {
			set({ loading: false })
			return
		}
		const { data, error } = await supabase.from('cart').select('*').eq('user_id', user.id)

		if (error) {
			set({ loading: false })
			return
		}

		set({ cartItems: data, hasFetchedCartItems: true, loading: false })
		get().calculateTotalPrice()
	},
}))
