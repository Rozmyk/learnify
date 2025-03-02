import { ReactNode } from 'react'

const SectionTitle = ({ children, additionalText }: { children: string | ReactNode; additionalText?: string }) => {
	return (
		<div className='flex flex-col justify-start items-start mb-8'>
			<h3 className='text-2xl font-semibold '>{children}</h3>
			{additionalText && <p className=' text-sm font-medium text-muted-foreground'>{additionalText}</p>}
		</div>
	)
}

export default SectionTitle
