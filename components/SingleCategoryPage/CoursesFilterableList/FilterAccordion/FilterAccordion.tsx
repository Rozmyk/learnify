import * as Accordion from '@radix-ui/react-accordion'
import SingleAccordion from './SingleAccordion/SingleAccordion'

const FilterAccordion = () => {
	return (
		<Accordion.Root type='multiple' defaultValue={['Ranking', 'Price']} className='w-full border-t border-border'>
			<SingleAccordion item='Ranking'>
				<div>options</div>
			</SingleAccordion>
			<SingleAccordion item='Price'>
				<div>options</div>
			</SingleAccordion>
			<SingleAccordion item='Level'>
				<div>options</div>
			</SingleAccordion>
		</Accordion.Root>
	)
}

export default FilterAccordion
