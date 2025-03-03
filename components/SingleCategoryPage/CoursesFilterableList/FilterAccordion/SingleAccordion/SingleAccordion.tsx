import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

const SingleAccordion = ({ item, children }: { item: string; children: ReactNode }) => {
	return (
		<Accordion.Item key={item} value={item} className='border-b w-full '>
			<Accordion.Header>
				<Accordion.Trigger className='flex justify-between w-full py-3 text-left font-semibold'>
					{item}
					<ChevronDown size={16} className='transition-transform duration-200 text-muted-foreground' />
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content className='overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp'>
				<div className='p-4'>{children}</div>
			</Accordion.Content>
		</Accordion.Item>
	)
}

export default SingleAccordion
