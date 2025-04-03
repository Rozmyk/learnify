import { CategoryProps } from '@/types/api'
import { useState, useEffect } from 'react'
import CustomSelect from '../CustomSelect/CustomSelect'
import { Label } from '../ui/label'

const CategorySelect = ({
	value,
	onChange,
	withoutLabel,
}: {
	value: string
	onChange: (value: string) => void
	withoutLabel?: boolean
}) => {
	const [categoriesData, setCategoriesData] = useState<null | CategoryProps[]>(null)
	const [loading, setLoading] = useState(true)

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
			} finally {
				setLoading(false)
			}
		}

		getCategories()
	}, [])
	const options = categoriesData?.map(code => ({ label: code.name, value: code.id }))
	return (
		<div>
			{!withoutLabel && <Label>Category</Label>}
			<CustomSelect
				placeholder='Choose category'
				loading={loading}
				value={value}
				onChange={onChange}
				options={options ?? []}
			/>
		</div>
	)
}

export default CategorySelect
