import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import Skeleton from '../ui/skeleton'
import clsx from 'clsx'

interface SelectProps {
	value: string
	onChange: (value: string) => void
	options: { label: string; value: string }[]
	placeholder: string
	loading: boolean
}

const CustomSelect = ({ value, onChange, options, placeholder, loading }: SelectProps) => {
	return loading ? (
		<Skeleton />
	) : (
		<Select.Root value={value} onValueChange={onChange}>
			<Select.Trigger className='inline-flex items-center justify-between bg-background border border-input rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring max-w-96 focus-visible:ring-offset-2 text-muted-foreground w-full'>
				<Select.Value placeholder={placeholder} />
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
								className={clsx(
									'cursor-pointer text-sm select-none px-4 py-2 rounded flex items-center justify-between',
									'hover:bg-secondary'
								)}>
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
