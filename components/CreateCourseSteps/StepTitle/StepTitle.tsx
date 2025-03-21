const StepTitle = ({ title, description }: { title: string; description?: string }) => {
	return (
		<div className='text-center'>
			<h1 className='text-4xl font-semibold mb-8'>{title}</h1>
			{description && <p className='mb-10 text-muted-foreground'>{description}.</p>}
		</div>
	)
}

export default StepTitle
