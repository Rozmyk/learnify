'use client'

import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { CartItemProps } from '@/types/api'

interface CartState {
	cartItems: CartItemProps[]
	totalPrice: number
	originalTotal: number
	promoError: null | string
	setPromoError: (error: string | null) => void
	loading: boolean
	promocodeLoading: boolean
	hasFetchedCartItems: boolean
	deletePromoCode: (promocode: string) => Promise<void>
	promoCode: string | null
	discount: number
	fetchCart: () => Promise<void>
	addToCart: (item: string) => Promise<void>
	removeFromCart: (productId: string) => Promise<void>
	applyPromoCode: (code: string) => Promise<void>
	calculateTotalPrice: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
	cartItems: [],
	totalPrice: 0,
	originalTotal: 0,
	loading: false,
	promoError: null,
	promocodeLoading: false,
	hasFetchedCartItems: false,
	promoCode: null,
	discount: 0,
	setPromoError: (error: string | null) => set({ promoError: error }),
	calculateTotalPrice: () => {
		const { cartItems, discount } = get()
		const originalTotal = cartItems.reduce((sum, item) => {
			return sum + (item.course?.price ?? 0) * (1 - (item?.course?.discount ?? 0) / 100)
		}, 0)
		const total = cartItems.reduce((sum, item) => {
			const price = (item.course?.price ?? 0) * (1 - (item?.course?.discount ?? 0) / 100) || 0
			const finalPrice = price * (1 - discount / 100)
			return sum + finalPrice
		}, 0)

		set({ totalPrice: parseFloat(total.toFixed(2)), originalTotal: parseFloat(originalTotal.toFixed(2)) })
	},

	applyPromoCode: async (code: string) => {
		set({ promocodeLoading: true })
		const supabase = createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user?.id) {
			set({ promocodeLoading: false })
			return
		}

		try {
			const { data: promo, error: promoError } = await supabase
				.from('promoCodes')
				.select('*')
				.eq('value', code)
				.eq('active', true)
				.single()

			if (promoError || !promo) {
				set({ promocodeLoading: false, promoError: 'Invalid promocode' })
				return
			}

			const { data: existingPromo } = await supabase.from('cart_promocodes').select('*').eq('user_id', user.id).single()

			if (existingPromo) {
				await supabase.from('cart_promocodes').delete().eq('user_id', user.id)
				set({ promocodeLoading: false, promoError: 'Error applying promo code' })
				return
			}

			const { error: insertError } = await supabase.from('cart_promocodes').insert([{ user_id: user.id, value: code }])

			if (insertError) {
				console.error('Error saving promo code:', insertError)
				return
			}

			set({ promoCode: code, discount: promo.discount })
			get().calculateTotalPrice()
		} catch (err) {
			console.error('Error in applyPromoCode:', err)
		} finally {
			set({ promocodeLoading: false })
		}
	},

	deletePromoCode: async (promocode: string) => {
		const supabase = createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user?.id) {
			set({ promocodeLoading: false })
			return
		}
		const { error } = await supabase.from('cart_promocodes').delete().eq('value', promocode).eq('user_id', user.id)
		if (!error) {
			set({ promoCode: null, discount: 0 })
			get().calculateTotalPrice()
		}
	},

	addToCart: async (newItem: string) => {
		set({ loading: true })
		const { cartItems, calculateTotalPrice } = get()
		const supabase = createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user?.id) {
			set({ loading: false })
			return
		}

		if (cartItems.some(item => item.product_id === newItem)) {
			set({ loading: false })
			return
		}

		const { data, error } = await supabase.from('course').select('*, profiles(*)').eq('id', newItem).single()

		if (error) {
			set({ loading: false })
			return
		}

		if (data && user) {
			const updatedItem = { product_id: newItem, course: data, user_id: user.id }
			set(state => ({ cartItems: [...state.cartItems, updatedItem], loading: false }))

			const { error: uploadError } = await supabase.from('cart').insert([{ user_id: user.id, product_id: newItem }])
			if (uploadError) {
				console.log(uploadError)
			}
			calculateTotalPrice()
		}
	},

	removeFromCart: async (productId: string) => {
		set({ loading: true })
		const { cartItems, calculateTotalPrice } = get()
		const supabase = createClient()
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user?.id) {
			set({ loading: false })
			return
		}

		const updatedItems = cartItems.filter(item => item.product_id !== productId)
		const { error } = await supabase.from('cart').delete().eq('user_id', user.id).eq('product_id', productId)

		if (!error) {
			set({ cartItems: updatedItems, loading: false })
			calculateTotalPrice()
		}
	},

	fetchCart: async () => {
		set({ loading: true })
		const { hasFetchedCartItems } = get()

		if (!hasFetchedCartItems) {
			const supabase = createClient()
			const {
				data: { user },
			} = await supabase.auth.getUser()

			if (!user?.id) {
				set({ loading: false })
				return
			}

			const { data: cartData, error: cartError } = await supabase
				.from('cart')
				.select('*, course(*, profiles(*), reviews(*))')
				.eq('user_id', user.id)

			if (cartError) {
				set({ loading: false })
				return
			}

			const { data: promo, error: promoError } = await supabase
				.from('cart_promocodes')
				.select('value')
				.eq('user_id', user.id)
				.single()
			let promocodeValues

			if (promo) {
				const { data } = await supabase.from('promoCodes').select('*').eq('value', promo.value).single()
				promocodeValues = { value: data.value, discount: data.discount }
			}

			set({
				cartItems: cartData,
				hasFetchedCartItems: true,
				loading: false,
				promoCode: promo ? promocodeValues?.value : null,
				discount: promo ? promocodeValues?.discount : 0,
			})

			get().calculateTotalPrice()
		}
	},
}))
