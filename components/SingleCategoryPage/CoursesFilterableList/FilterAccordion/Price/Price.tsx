import SingleAccordion from '../SingleAccordion/SingleAccordion'
import CheckboxWithLabel from '@/components/ui/ChecboxWithLabel/CheckboxWithLabel'

const Price = ({
	filters,
	handleFilter,
}: {
	filters: Record<string, string>
	handleFilter: (paramsToUpdate: Record<string, string>) => void
}) => {
	return (
		<SingleAccordion item='Price'>
			<div className='flex flex-col gap-4'>
				<CheckboxWithLabel
					id='free'
					text='Free'
					value={filters.free === 'true'}
					onChange={checked => handleFilter({ free: checked ? 'true' : '' })}
				/>

				<CheckboxWithLabel
					onChange={checked => handleFilter({ payable: checked ? 'true' : '' })}
					value={filters.payable === 'true'}
					id='payable'
					text='Payable'
				/>
			</div>
		</SingleAccordion>
	)
}

export default Price
