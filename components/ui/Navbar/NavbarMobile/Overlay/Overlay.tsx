const Overlay = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
	return isOpen && <div className='fixed inset-0 bg-black bg-opacity-60 z-30' onClick={handleClose} />
}

export default Overlay
