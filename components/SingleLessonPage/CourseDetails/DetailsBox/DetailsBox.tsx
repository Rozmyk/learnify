'use client'

import { ReactNode } from 'react'

const DetailsBox = ({ title, children }: { title: string; children: ReactNode }) => {
	return (
		<div className='p-6 w-full flex justify-between items-start border-t border-border'>
			<div className='w-full md:w-1/4'>
				<h2 className='text-lg font-semibold mb-4 capitalize '>{title}</h2>
			</div>
			<div className='w-full md:w-3/4 text-sm text-muted-foreground'>{children}</div>
		</div>
	)
}

export default DetailsBox
