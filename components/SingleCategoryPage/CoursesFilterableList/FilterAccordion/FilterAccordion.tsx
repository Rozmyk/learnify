import * as Accordion from '@radix-ui/react-accordion'
import Ranking from './Ranking/Ranking'
import Price from './Price/Price'
import Level from './Level/Level'
import Language from './Language/Language'

const FilterAccordion = ({
	filters,
	handleFilter,
}: {
	filters: Record<string, string>
	handleFilter: (paramsToUpdate: Record<string, string>) => void
}) => {
	return (
		<Accordion.Root type='multiple' defaultValue={['Ranking', 'Price']} className='w-full border-t border-border'>
			<Ranking handleFilter={handleFilter} filters={filters} />
			<Price filters={filters} handleFilter={handleFilter} />
			<Level filters={filters} handleFilter={handleFilter} />
			<Language filters={filters} handleFilter={handleFilter} />
		</Accordion.Root>
	)
}

export default FilterAccordion
