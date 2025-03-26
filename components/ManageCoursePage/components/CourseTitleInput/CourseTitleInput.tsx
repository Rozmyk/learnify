import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
interface CourseTitleInputProps {
	label: string
	description: string
	placeholder: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CourseTitleInput = ({ label, description, placeholder, value, onChange }: CourseTitleInputProps) => {
	return (
		<div>
			<Label className='font-semibold my-1'>{label}</Label>
			<Input value={value} onChange={onChange} placeholder={placeholder} />
			<p className='text-xs text-muted-foreground mt-2 mb-4'>{description}</p>
		</div>
	)
}

export default CourseTitleInput
