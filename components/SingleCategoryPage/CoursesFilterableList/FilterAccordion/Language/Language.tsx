import SingleAccordion from '../SingleAccordion/SingleAccordion'
import CheckboxWithLabel from '@/components/ui/ChecboxWithLabel/CheckboxWithLabel'
import { LanguageProps } from '@/types/api'
import { useState, useEffect } from 'react'
import Loader from '@/components/ui/loader'

const Language = ({
	filters,
	handleFilter,
}: {
	filters: Record<string, string>
	handleFilter: (paramsToUpdate: Record<string, string>) => void
}) => {
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

	return (
		<SingleAccordion item='Language'>
			<div className='flex flex-col gap-2'>
				{loading ? (
					<Loader />
				) : (
					languages?.map(lang => (
						<CheckboxWithLabel
							onChange={checked => handleFilter({ lang: checked ? lang.lang_code : '' })}
							key={lang.id}
							value={filters.lang === lang.lang_code}
							text={`${lang.name}`}
							id={`language-${lang.name.toLowerCase()}`}
						/>
					))
				)}
			</div>
		</SingleAccordion>
	)
}

export default Language
