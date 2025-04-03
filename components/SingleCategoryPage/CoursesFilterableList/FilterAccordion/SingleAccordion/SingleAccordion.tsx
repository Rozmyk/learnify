import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
const SingleAccordion = ({ item, children }: { item: string; children: ReactNode }) => {
	const contentRef = useRef<HTMLDivElement>(null)
	const [isExpanded, setIsExpanded] = useState(false)
	const [showButton, setShowButton] = useState(false)

	useEffect(() => {
		if (contentRef.current) {
			setShowButton(contentRef.current.scrollHeight > 200)
		}
	}, [children])

	return (
		<Accordion.Item key={item} value={item} className='border-b w-full'>
			<Accordion.Header>
				<Accordion.Trigger className='flex justify-between w-full py-3 text-left font-semibold'>
					{item}
					<ChevronDown size={16} className='transition-transform duration-200 text-muted-foreground' />
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content className='overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp'>
				<div
					ref={contentRef}
					className={`p-4 transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-[200px] overflow-hidden'}`}>
					{children}
				</div>
				{showButton && (
					<Button variant='ghost' onClick={() => setIsExpanded(!isExpanded)} className='mt-2  underline text-sm'>
						{isExpanded ? 'Show less' : 'Show more'}
					</Button>
				)}
			</Accordion.Content>
		</Accordion.Item>
	)
}

export default SingleAccordion
