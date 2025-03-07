const PublicHeader = () => {
	return (
		<header className='relative'>
			<div
				className=' w-full h-[400px] bg-blue-300 bg-center'
				style={{ backgroundImage: "url('/headerImage.png')" }}></div>
			<div className='md:absolute md:top-10 md:left-10 max-w-96 p-4 bg-card shadow-lg rounded-md'>
				<p className='text-3xl font-semibold'>Find what works for you</p>
				<p className='text-muted-foreground'>
					Courses from as low as 39.99 zł - promotion ends today. Learn topics that interest you, taught by experts with
					practical experience.
				</p>
			</div>
		</header>
	)
}

export default PublicHeader
