import { Button } from '@/components/ui/button'
const DeleteContent = () => {
	return (
		<div className='flex flex-col justify-start items-start w-full '>
			<p className='mb-8'>
				<span className='text-red-400 font-semibold'>Warning!</span> If you close your account, we will unsubscribe you
				from all courses you attend and you will forever lose access to your account and associated data, even if you
				create a new account using the same email address in the future.
			</p>
			<Button>Delete account</Button>
		</div>
	)
}

export default DeleteContent
