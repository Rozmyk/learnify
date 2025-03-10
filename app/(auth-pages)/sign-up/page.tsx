import { signUpAction } from '@/app/actions'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function Signup(props: { searchParams: Promise<Message> }) {
	const searchParams = await props.searchParams

	if ('message' in searchParams) {
		return (
			<div className='w-full flex-1 flex items-center min-h-[calc(100vh-4rem)] justify-center gap-2 p-4'>
				<FormMessage message={searchParams} />
			</div>
		)
	}

	return (
		<div className='min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-2'>
			<div className='border border-border w-full sm:w-[30rem] p-4 rounded-xl flex flex-col gap-4'>
				<form className='flex flex-col w-full'>
					<h1 className='text-2xl font-medium'>Sign up</h1>
					<p className='text-sm text-foreground'>
						Already have an account?{' '}
						<Link className='text-primary font-medium underline' href='/sign-in'>
							Sign in
						</Link>
					</p>

					<div className='mb-4 mt-8 flex items-center gap-2'>
						<Label htmlFor='isTeacher'>You are a teacher?</Label>
						<input
							type='checkbox'
							className='peer w-4 h-4 rounded border border-border bg-secondary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:text-black transition-colors cursor-pointer'
							name='isTeacher'
							id='isTeacher'
						/>
					</div>

					<div className='flex flex-col gap-2 [&>input]:mb-3 mt-4'>
						<Label htmlFor='email'>Email</Label>
						<Input name='email' placeholder='you@example.com' required />

						<Label htmlFor='username'>Username</Label>
						<Input name='username' placeholder='Your username' required />

						<Label htmlFor='password'>Password</Label>
						<Input type='password' name='password' placeholder='Your password' minLength={6} required />

						<SubmitButton formAction={signUpAction} pendingText='Signing up...'>
							Sign up
						</SubmitButton>
						<FormMessage message={searchParams} />
					</div>
				</form>
			</div>
		</div>
	)
}
