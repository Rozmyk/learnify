import ISO6391 from 'iso-639-1'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import CategorySelect from '@/components/CategorySelect/CategorySelect'
const LanguageSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const languages = ISO6391.getAllNames()
	const languageCodes = ISO6391.getAllCodes()

	const options = languageCodes.map((code, index) => ({
		label: `${languages[index]} `,
		value: code,
	}))

	return <CustomSelect value={value} onChange={onChange} options={options} placeholder='Choose language' />
}
const LevelSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
	const options = [
		{
			label: 'Begginer',
			value: 'Begginer',
		},
		{
			label: 'Intermediate',
			value: 'Intermediate',
		},
		{
			label: 'Advanced',
			value: 'Advanced',
		},
	]
	return <CustomSelect value={value} onChange={onChange} placeholder='Choose level' options={options} />
}

const BasicInfo = () => {
	const [language, setLanguage] = useState('')
	const [level, setLevel] = useState('')
	const [category, setCategory] = useState<string | null>('')

	return (
		<div className='mb-10'>
			<Label className='font-semibold my-1 text-base'>Basic information</Label>
			<div className='grid grid-cols-3 gap-4 w-full'>
				<LanguageSelect value={language} onChange={setLanguage} />
				<LevelSelect value={level} onChange={setLevel} />
				<CategorySelect selectedCategory={category} setSelectedCategory={setCategory} withoutLabel />
			</div>
		</div>
	)
}

export default BasicInfo
