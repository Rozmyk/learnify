import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
interface CourseTitleInputProps {
	label: string
	description: string
	placeholder: string
	value: string
	maxLength?: number
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CourseTitleInput = ({ label, description, placeholder, value, onChange, maxLength }: CourseTitleInputProps) => {
	return (
		<div className='w-full mb-10'>
			<Label className='font-semibold my-1'>{label}</Label>
			<div className='flex w-full justify-between  items-center gap-2'>
				<Input maxLength={maxLength} value={value} onChange={onChange} placeholder={placeholder} />

				{maxLength && <p className=' w-10 flex justify-center items-center  text-muted-foreground'>{value.length}</p>}
			</div>
			<p className='text-xs text-muted-foreground mt-2 mb-4'>{description}</p>
		</div>
	)
}

export default CourseTitleInput
