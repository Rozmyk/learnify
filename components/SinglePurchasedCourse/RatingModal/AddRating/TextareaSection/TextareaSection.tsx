import { Dispatch, SetStateAction } from 'react'

const TextareaSection = ({
	textareaValue,
	setTextareaValue,
	showTextarea,
}: {
	textareaValue: string
	setTextareaValue: Dispatch<SetStateAction<string>>
	showTextarea: boolean
}) => {
	return (
		<div>
			{showTextarea && (
				<textarea
					value={textareaValue}
					onChange={e => setTextareaValue(e.target.value)}
					className='p-4 rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-4 mb-8 w-full min-h-40  resize-none'
					placeholder='Tell us about your impressions of the course. Did it interest you?'
				/>
			)}
		</div>
	)
}

export default TextareaSection
