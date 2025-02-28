import SingleLessonPoint from './SingleLessonPoint/SingleLessonPoint'
const WhatYouLearn = ({ skills_gained }: { skills_gained: string }) => {
	const splitStringToArray = (text: string) => {
		if (!text) return []
		return text
			.split(';')
			.map(sentence => sentence.trim())
			.filter(sentence => sentence.length > 0)
	}
	const skillsArray = splitStringToArray(skills_gained)
	return (
		<div className='mt-10 border border-border p-4  w-full  rounded-lg '>
			<h3 className='text-2xl font-semibold mb-8'>What you will learn</h3>
			<div className='grid  grid-cols-1 md:grid-cols-2 gap-4'>
				{skillsArray.map(singleText => (
					<SingleLessonPoint key={singleText} value={singleText} />
				))}
			</div>
		</div>
	)
}

export default WhatYouLearn
