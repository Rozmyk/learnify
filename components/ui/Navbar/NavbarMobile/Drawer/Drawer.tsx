const Drawer = ({ isOpen }: { isOpen: boolean }) => {
	return (
		<div
			className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-card w-64 dark:bg-card ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
			aria-labelledby='drawer-navigation-label'>
			<p className='text-black dark:text-white'>drawer content</p>
		</div>
	)
}

export default Drawer
