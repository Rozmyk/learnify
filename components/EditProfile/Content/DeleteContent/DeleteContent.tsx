import { Button } from '@/components/ui/button'
import ConfirmModal from './ConfirmModal/ConfirmModal'
const DeleteContent = () => {
	return (
		<div className='flex flex-col justify-start items-start w-full '>
			<p className='mb-8'>
				<span className='text-red-400 font-semibold'>Warning!</span> If you close your account, we will unsubscribe you
				from all courses you attend and you will forever lose access to your account and associated data, even if you
				create a new account using the same email address in the future.
			</p>

			<ConfirmModal>
				<Button>Delete account</Button>
			</ConfirmModal>
		</div>
	)
}

export default DeleteContent
