const EditProfileHeader = ({ title, text }: { title: string; text: string }) => {
	return (
		<div className='flex flex-col justify-center items-center border-b border-border  w-full p-4'>
			<h2 className='text-2xl font-semibold'>{title}</h2>
			<p className='text-muted-foreground '>{text}</p>
		</div>
	)
}

export default EditProfileHeader
