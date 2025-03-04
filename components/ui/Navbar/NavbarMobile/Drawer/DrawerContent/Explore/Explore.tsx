import SingleLink from '../SingleLink/SingleLink'
const Explore = ({ handleCloseDrawer }: { handleCloseDrawer: () => void }) => {
	return (
		<div>
			<p className='font-semibold my-2'>Explore</p>
			<span onClick={handleCloseDrawer}>
				<SingleLink href='/courses' content='My courses' />
			</span>
		</div>
	)
}

export default Explore
