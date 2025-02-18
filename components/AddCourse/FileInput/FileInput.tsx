import { Label } from '@/components/ui/label'
import { Dispatch, SetStateAction } from 'react'
import { Input } from '@/components/ui/input'
const FileInput = ({ setThumbnail }: { setThumbnail: Dispatch<SetStateAction<File | null>> }) => {
	return (
		<div>
			<Label>Upload thumbnail</Label>
			<Input onChange={e => setThumbnail(e.target.files?.[0] || null)} accept='image/*' type='file' />

			<p className='mt-1 text-sm text-muted-foreground' id='file_input_help'>
				SVG, PNG, JPG or GIF
			</p>
		</div>
	)
}

export default FileInput
