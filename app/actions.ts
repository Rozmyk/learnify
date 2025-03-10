'use server'

import { encodedRedirect } from '@/utils/utils'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const signUpAction = async (formData: FormData) => {
	const email = formData.get('email')?.toString()
	const password = formData.get('password')?.toString()
	const username = formData.get('username')?.toString()
	const isTeacher = formData.get('isTeacher')
	const supabase = await createClient()
	const origin = (await headers()).get('origin')

	if (!email || !password) {
		return encodedRedirect('error', '/sign-up', 'Email and password are required')
	}

	const { data, error: signUpError } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	})

	if (signUpError) {
		console.error(signUpError.code + ' ' + signUpError.message)
		return encodedRedirect('error', '/sign-up', signUpError.message)
	}

	const user = data?.user

	if (!user) {
		return encodedRedirect('error', '/sign-up', 'User creation failed')
	}

	const { data: existingUser, error: usernameCheckError } = await supabase
		.from('profiles')
		.select('username')
		.eq('username', username)
		.single()

	if (usernameCheckError === null && existingUser) {
		return encodedRedirect('error', '/sign-up', 'Username is already taken')
	}

	const avatar_url =
		'https://wltlbfcgbnhlxamxxnve.supabase.co/storage/v1/object/sign/usersAvatar/defaultAvatar.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2Vyc0F2YXRhci9kZWZhdWx0QXZhdGFyLndlYnAiLCJpYXQiOjE3Mzk0NTMwNTIsImV4cCI6MTc3MDk4OTA1Mn0.skjLCnw3EsKSkGAFWRI1krLu5dCkx91sp2s4O2UMBQA'

	const { error: profileError } = await supabase.from('profiles').insert([
		{
			id: user.id,
			created_at: new Date().toISOString(),
			username: username,
			avatar_url: avatar_url,
			email,
			isTeacher: isTeacher,
		},
	])

	if (profileError) {
		console.error(profileError.code + ' ' + profileError.message)
		return encodedRedirect('error', '/sign-up', 'Error creating profile: ' + profileError.message)
	}

	return encodedRedirect(
		'success',
		'/sign-up',
		'Thanks for signing up! Please check your email for a verification link.'
	)
}

export const signInAction = async (formData: FormData) => {
	const email = formData.get('email') as string
	const password = formData.get('password') as string
	const supabase = await createClient()

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		return encodedRedirect('error', '/sign-in', error.message)
	}

	return redirect('/')
}

export const forgotPasswordAction = async (formData: FormData) => {
	const email = formData.get('email')?.toString()
	const supabase = await createClient()
	const origin = (await headers()).get('origin')
	const callbackUrl = formData.get('callbackUrl')?.toString()

	if (!email) {
		return encodedRedirect('error', '/forgot-password', 'Email is required')
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
	})

	if (error) {
		console.error(error.message)
		return encodedRedirect('error', '/forgot-password', 'Could not reset password')
	}

	if (callbackUrl) {
		return redirect(callbackUrl)
	}

	return encodedRedirect('success', '/forgot-password', 'Check your email for a link to reset your password.')
}

export const resetPasswordAction = async (formData: FormData) => {
	const supabase = await createClient()

	const password = formData.get('password') as string
	const confirmPassword = formData.get('confirmPassword') as string

	if (!password || !confirmPassword) {
		encodedRedirect('error', '/protected/reset-password', 'Password and confirm password are required')
	}

	if (password !== confirmPassword) {
		encodedRedirect('error', '/protected/reset-password', 'Passwords do not match')
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	})

	if (error) {
		encodedRedirect('error', '/protected/reset-password', 'Password update failed')
	}

	encodedRedirect('success', '/protected/reset-password', 'Password updated')
}

export const signOutAction = async () => {
	const supabase = await createClient()
	await supabase.auth.signOut()
	return redirect('/')
}
