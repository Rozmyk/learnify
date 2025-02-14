import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
const CloseButton = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
	return (
		isOpen && (
			<Button
				variant='outline'
				size='icon'
				onClick={handleClose}
				className='fixed left-[18rem] top-4 z-50 rounded-full '>
				<X size={16} />
			</Button>
		)
	)
}

export default CloseButton
