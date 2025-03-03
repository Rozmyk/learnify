import * as Accordion from '@radix-ui/react-accordion'
import SingleAccordion from './SingleAccordion/SingleAccordion'

const FilterAccordion = () => {
	return (
		<Accordion.Root type='multiple' className='w-full'>
			<SingleAccordion item='Ranking'>
				<div>options</div>
			</SingleAccordion>
		</Accordion.Root>
	)
}

export default FilterAccordion
