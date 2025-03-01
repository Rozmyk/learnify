import SectionTitle from '@/components/SectionTitle/SectionTitle'
const SectionDescription = ({ title, text }: { title: string; text: string }) => {
	return (
		<div className='flex flex-col justify-start items-start mb-4'>
			<SectionTitle>{title}</SectionTitle>
			<p className='text-muted-foreground'>{text}</p>
		</div>
	)
}

export default SectionDescription
