import ISO6391 from 'iso-639-1'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { Label } from '@/components/ui/label'
import { LevelProps } from '@/types/api'
import CategorySelect from '@/components/CategorySelect/CategorySelect'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'

const LanguageSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const languages = ISO6391.getAllNames()
	const languageCodes = ISO6391.getAllCodes()

	const options = languageCodes.map((code, index) => ({
		label: `${languages[index]} `,
		value: code,
	}))

	return <CustomSelect value={value} onChange={onChange} options={options} placeholder='Choose language' />
}
const LevelSelect = ({ value, onChange }: { value: LevelProps | ''; onChange: (value: LevelProps) => void }) => {
	const options = [
		{ label: 'Beginner', value: LevelProps.begginer },
		{ label: 'Intermediate', value: LevelProps.intermediate },
		{ label: 'Advanced', value: LevelProps.advanced },
	]

	return (
		<CustomSelect
			value={value.toString()}
			onChange={e => onChange(e as LevelProps)}
			placeholder='Choose level'
			options={options}
		/>
	)
}

const BasicInfo = () => {
	const { temporaryData, setTemporaryData } = useCreateCourseStore()

	return (
		<div className='mb-10'>
			<Label className='font-semibold my-1 text-base'>Basic information</Label>
			<div className='grid grid-cols-3 gap-4 w-full'>
				<LanguageSelect
					value={temporaryData.language ?? ''}
					onChange={e => setTemporaryData({ ...temporaryData, language: e })}
				/>
				<LevelSelect
					value={temporaryData.level ?? ''}
					onChange={e => setTemporaryData({ ...temporaryData, level: e as LevelProps })}
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
