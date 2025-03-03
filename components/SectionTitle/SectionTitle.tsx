import { ReactNode } from 'react'

interface SectionTitleProps {
	children: string | ReactNode
	additionalText?: string
	className?: string
}

const SectionTitle = ({ children, additionalText, className }: SectionTitleProps) => {
	return (
		<div className={`flex flex-col justify-start items-start mb-8 ${className ?? ''}`}>
			<h3 className='text-2xl font-semibold'>{children}</h3>
			{additionalText && <p className='text-sm font-medium text-muted-foreground'>{additionalText}</p>}
		</div>
	)
}

export default SectionTitle
