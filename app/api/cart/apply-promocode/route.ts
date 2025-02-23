import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
	const supabase = await createClient()
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError) {
		console.log(authError)
	}

	try {
		const { promoCode } = await req.json()

		if (!user?.id || !promoCode) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
			)
		}

		const { data: promo, error: promoError } = await supabase
			.from('promoCodes')
			.select('*')
			.eq('value', promoCode)
			.eq('active', true)
			.single()

		if (!promo || promoError) {
			return NextResponse.json(
				{ error: 'Invalid or inactive promo code' },
				{ status: 404, headers: { 'Access-Control-Allow-Origin': '*' } }
			)
		}

		await supabase.from('cart_promocodes').delete().eq('user_id', user.id)

		const { error: insertError } = await supabase.from('cart_promocodes').insert([
			{
				user_id: user.id,
				value: promoCode,
			},
		])

		if (insertError) {
			return NextResponse.json(
				{ error: 'Failed to apply promo code' },
				{ status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
			)
		}

		const { data: appliedPromo, error: fetchError } = await supabase
			.from('cart_promocodes')
			.select('*')
			.eq('user_id', user.id)
			.single()

		if (fetchError) {
			return NextResponse.json(
				{ error: 'Failed to retrieve applied promo code' },
				{ status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
			)
		}

		return NextResponse.json(
			{
				success: true,
				message: 'Promo code applied',
				appliedPromoCode: appliedPromo,
			},
			{ headers: { 'Access-Control-Allow-Origin': '*' } }
		)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Server error' },
			{ status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
		)
	}
}

export async function OPTIONS() {
	return NextResponse.json(
		{},
		{
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			},
		}
	)
}
