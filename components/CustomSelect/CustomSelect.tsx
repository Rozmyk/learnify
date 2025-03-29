import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

interface SelectProps {
	value: string
	onChange: (value: string) => void
	options: { label: string; value: string }[]
	placeholder: string
}

const CustomSelect = ({ value, onChange, options, placeholder }: SelectProps) => {
	console.log(value)
	return (
		<Select.Root value={value} onValueChange={onChange}>
			<Select.Trigger className='inline-flex items-center justify-between bg-background border border-input rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-muted-foreground'>
				{value ? <Select.Value /> : <span className='text-muted-foreground'>{placeholder}</span>}
				<Select.Icon>
					<ChevronDown />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content className='bg-background border shadow-md rounded-md'>
					<Select.ScrollUpButton />
					<Select.Viewport className='p-2 overflow-auto'>
						{options.map(option => (
							<Select.Item
								key={option.value}
								value={option.value}
								className='cursor-pointer select-none px-4 py-2 rounded hover:bg-secondary flex items-center justify-between'>
								<Select.ItemText>{option.label}</Select.ItemText>
								<Select.ItemIndicator>
									<Check />
								</Select.ItemIndicator>
							</Select.Item>
						))}
					</Select.Viewport>
					<Select.ScrollDownButton />
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	)
}

export default CustomSelect
