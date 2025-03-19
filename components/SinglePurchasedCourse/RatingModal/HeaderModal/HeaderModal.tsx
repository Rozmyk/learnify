import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
const HeaderModal = ({
	leftButtonAction,
	rightButtonAction,
}: {
	leftButtonAction?: () => void | undefined
	rightButtonAction?: () => void
}) => {
	return (
		<div className='w-full flex justify-between items-center'>
			{leftButtonAction ? (
				<Button onClick={leftButtonAction} variant='link'>
					Back
				</Button>
			) : (
				<div />
			)}
			{rightButtonAction && (
				<Button size='icon' variant='ghost' onClick={rightButtonAction}>
					<X />
				</Button>
			)}
		</div>
	)
}

export default HeaderModal
