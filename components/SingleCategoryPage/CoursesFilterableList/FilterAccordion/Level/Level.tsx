import SingleAccordion from '../SingleAccordion/SingleAccordion'
import CheckboxWithLabel from '@/components/ui/ChecboxWithLabel/CheckboxWithLabel'
const Level = ({
	filters,
	handleFilter,
}: {
	filters: Record<string, string>
	handleFilter: (paramsToUpdate: Record<string, string>) => void
}) => {
	return (
		<SingleAccordion item='Level'>
			<div className='flex flex-col gap-4'>
				<CheckboxWithLabel
					onChange={checked => handleFilter({ instructional_level: checked ? 'begginer' : '' })}
					value={filters.instructional_level == 'begginer'}
					id='begginer'
					text='Begginer'
				/>
				<CheckboxWithLabel
					onChange={checked => handleFilter({ instructional_level: checked ? 'intermediate' : '' })}
					value={filters.instructional_level == 'intermediate'}
					id='intermediate'
					text='Intermediate'
				/>
				<CheckboxWithLabel
					onChange={checked => handleFilter({ instructional_level: checked ? 'advanced' : '' })}
					value={filters.instructional_level == 'advanced'}
					id='advanced'
					text='Advanced'
				/>
			</div>
		</SingleAccordion>
	)
}

export default Level
