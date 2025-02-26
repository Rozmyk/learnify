const SectionDescription = ({ title, text }: { title: string; text: string }) => {
	return (
		<div>
			<h3 className='text-2xl font-semibold mb-8'>{title}</h3>
			<p className='text-muted-foreground'>{text}</p>
		</div>
	)
}

export default SectionDescription
