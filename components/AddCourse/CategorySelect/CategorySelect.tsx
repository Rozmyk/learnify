import { CategoryProps } from '@/types/api'
import * as Select from '@radix-ui/react-select'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Label } from '@/components/ui/label'

const CategorySelect = ({
	selectedCategory,
	setSelectedCategory,
}: {
	selectedCategory: string | null
	setSelectedCategory: Dispatch<SetStateAction<string | null>>
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
			<Label>Category</Label>
			<Select.Root value={selectedCategory ?? undefined} onValueChange={setSelectedCategory}>
				<Select.Trigger className='inline-flex items-center justify-between bg-background border border-input  rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-muted-foreground '>
					<Select.Value placeholder='Choose category' />
				</Select.Trigger>

				<Select.Portal>
					<Select.Content className='bg-background border border-input rounded shadow-lg '>
						<Select.ScrollUpButton />
						<Select.Viewport className='p-2'>
							{categoriesData?.map(value => (
								<Select.Item
									key={value.id}
									value={value.id}
									className='cursor-pointer select-none px-4 py-2 rounded hover:bg-accent focus:bg-accent
                                flex items-center justify-between'>
									<Select.ItemText>{value.name}</Select.ItemText>
									<Select.ItemIndicator></Select.ItemIndicator>
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
