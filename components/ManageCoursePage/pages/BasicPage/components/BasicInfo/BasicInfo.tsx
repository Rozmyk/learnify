import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { Label } from '@/components/ui/label'

import CategorySelect from '@/components/CategorySelect/CategorySelect'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import { useState, useEffect } from 'react'
import { LanguageProps, LevelProps } from '@/types/api'
const LanguageSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const [languages, setLanguages] = useState<LanguageProps[] | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				const response = await fetch('/api/languages')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()
				console.log(data)
				setLanguages(data.languages)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
		fetchLanguages()
	}, [])

	const options = languages?.map(code => ({
		label: code.name,
		value: code.id,
	}))
	return (
		<CustomSelect
			value={value}
			onChange={onChange}
			loading={loading}
			options={options ?? []}
			placeholder='Choose language'
		/>
	)
}
const LevelSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const [levels, setLevels] = useState<LevelProps[] | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchLevels = async () => {
			try {
				const response = await fetch('/api/levels')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()

				setLevels(data.levels)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
		fetchLevels()
	}, [])
	const options = levels?.map(level => ({
		label: level.name,
		value: level.id,
	}))

	return (
		<CustomSelect
			loading={loading}
			value={value.toString()}
			onChange={e => onChange(e)}
			placeholder='Choose level'
			options={options ?? []}
		/>
	)
}

const BasicInfo = () => {
	const { temporaryData, setTemporaryData } = useCreateCourseStore()

	return (
		<div className='mb-10'>
			<Label className='font-semibold my-1 text-base '>Basic information</Label>
			<div className='grid grid-cols-3 gap-4 w-full mt-1'>
				<LanguageSelect
					value={temporaryData.lang_id ?? ''}
					onChange={e => setTemporaryData({ ...temporaryData, lang_id: e })}
				/>
				<LevelSelect
					value={temporaryData.level_id ?? ''}
					onChange={e => setTemporaryData({ ...temporaryData, level_id: e })}
				/>

				<CategorySelect
					value={temporaryData.categories_id ?? ''}
					onChange={e => setTemporaryData({ ...temporaryData, categories_id: e })}
					withoutLabel
				/>
			</div>
		</div>
	)
}

export default BasicInfo
