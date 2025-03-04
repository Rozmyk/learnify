import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
interface CheckboxWithLabelProps {
	value: boolean
	onChange: (value: boolean) => void
	text: string
	id: string
}

const CheckboxWithLabel = ({ value, onChange, text, id }: CheckboxWithLabelProps) => {
	return (
		<label htmlFor={id} className='flex items-center gap-2 cursor-pointer'>
			<CheckboxPrimitive.Root
				id={id}
				checked={value}
				onCheckedChange={checked => onChange(!!checked)}
				className={
					'peer w-4 h-4 rounded border border-border bg-secondary ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:text-black transition-colors cursor-pointer'
				}>
				<CheckboxPrimitive.Indicator className='flex items-center justify-center text-current'>
					<Check className='h-4 w-4' />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
			<span className='text-sm font-semibold'>{text}</span>
		</label>
	)
}

export default CheckboxWithLabel
