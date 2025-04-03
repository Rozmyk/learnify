import { Label } from '@/components/ui/label'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { CurrenciesProps } from '@/types/api'
const CurrencySelect = ({
	currencies,
	value,
	onChange,
}: {
	value: string
	onChange: (value: string) => void
	currencies: CurrenciesProps[] | null
}) => {
	const options = currencies?.map(code => ({ label: code.name, value: code.id }))

	return (
		<div className='flex flex-col gap-2'>
			<Label className='font-semibold my-1 text-base'>Currency</Label>
			<CustomSelect
				loading={false}
				value={value}
				onChange={onChange}
				placeholder='Choose currency'
				options={options ?? []}
			/>
		</div>
	)
}

export default CurrencySelect
