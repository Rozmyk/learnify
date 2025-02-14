import { Button } from '@/components/ui/button'
const CloseButton = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
	return (
		isOpen && (
			<Button variant='outline' onClick={handleClose} className='fixed left-[18rem] top-4 z-50 rounded-full '>
				X
			</Button>
		)
	)
}

export default CloseButton
