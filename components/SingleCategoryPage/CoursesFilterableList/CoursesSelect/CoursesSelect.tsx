import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'

const CoursesSelect = ({
	filters,
	handleFilter,
}: {
	filters: Record<string, string>
	handleFilter: (paramsToUpdate: Record<string, string>) => void
}) => {
	const selectArray = [
		{
			name: 'Highest rated',
			value: 'highest-rated',
		},
		{ name: 'Latest', value: 'newest' },
		{ name: 'Most popular', value: 'popularity' },
	]

	return (
		<Select.Root value={filters.sort || ''} onValueChange={value => handleFilter({ sort: value })}>
			<Select.Trigger className='inline-flex items-center justify-between bg-background border border-input rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-muted-foreground'>
				<Select.Value placeholder='Sort by' />
				<Select.Icon>
					<ChevronDown />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content className='bg-background border border-input rounded shadow-lg'>
					<Select.ScrollUpButton />
					<Select.Viewport className='p-2'>
						{selectArray.map(item => (
							<Select.Item
								key={item.value}
								value={item.value}
								className='cursor-pointer select-none px-4 py-2 rounded hover:bg-accent focus:bg-accent flex items-center justify-between'>
								<Select.ItemText>{item.name}</Select.ItemText>
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

export default CoursesSelect
