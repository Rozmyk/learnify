import { CategoryProps } from '@/types/api'
import * as Select from '@radix-ui/react-select'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Label } from '@/components/ui/label'
import { Check, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const CategorySelect = ({
	selectedCategory,
	setSelectedCategory,
	withoutLabel,
	className,
}: {
	selectedCategory: string | null
	setSelectedCategory: Dispatch<SetStateAction<string | null>>
	withoutLabel?: boolean
	className?: string
}) => {
	const [categoriesData, setCategoriesData] = useState<null | CategoryProps[]>(null)

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await fetch('/api/categories')

				if (!response.ok) {
					throw new Error('Failed to fetch categories')
				}

				const data = await response.json()
				setCategoriesData(data)
			} catch (error) {
				console.error('Error during category download:', error)
			}
		}

		getCategories()
	}, [])

	return (
		<>
			{!withoutLabel && <Label>Category</Label>}
			<Select.Root value={selectedCategory ?? undefined} onValueChange={setSelectedCategory}>
				<Select.Trigger
					className={clsx(
						'inline-flex items-center justify-between bg-background border border-input rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-muted-foreground',
						className
					)}>
					<Select.Value placeholder='Choose category' />
					<Select.Icon>
						<ChevronDown />
					</Select.Icon>
				</Select.Trigger>

				<Select.Portal>
					<Select.Content className='bg-background border border-input rounded shadow-lg '>
						<Select.ScrollUpButton />
						<Select.Viewport className='p-2'>
							{categoriesData?.map(value => (
								<Select.Item
									key={value.id}
									value={value.id}
									className='cursor-pointer select-none px-4 py-2 rounded hover:bg-accent focus:bg-accent flex items-center justify-between'>
									<Select.ItemText>{value.name}</Select.ItemText>
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
		</>
	)
}

export default CategorySelect
