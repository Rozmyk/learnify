import { ReactNode } from 'react'

const SectionTitle = ({ children }: { children: string | ReactNode }) => {
	return <h3 className='text-2xl font-semibold mb-8'>{children}</h3>
}

export default SectionTitle
