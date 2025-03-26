import { ReactNode } from 'react'
import SectionTitle from '@/components/SectionTitle/SectionTitle'

const PageWrapper = ({ children, title }: { children: ReactNode; title: string }) => {
	return (
		<div className='border border-border shadow-md'>
			<div className='p-4 border-b border-border py-6'>
				<SectionTitle className='mb-0'>{title}</SectionTitle>
			</div>

			<div className='p-6'>{children}</div>
		</div>
	)
}

export default PageWrapper
