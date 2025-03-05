import SingleAccordion from '../SingleAccordion/SingleAccordion'
import CheckboxWithLabel from '@/components/ui/ChecboxWithLabel/CheckboxWithLabel'

const Language = ({
	filters,
	handleFilter,
}: {
	filters: Record<string, string>
	handleFilter: (paramsToUpdate: Record<string, string>) => void
}) => {
	return (
		<SingleAccordion item='Language'>
			<CheckboxWithLabel
				onChange={checked => handleFilter({ lang: checked ? 'pl' : '' })}
				value={filters.lang == 'pl'}
				text='Polish'
				id='language-polish'
			/>
		</SingleAccordion>
	)
}

export default Language
