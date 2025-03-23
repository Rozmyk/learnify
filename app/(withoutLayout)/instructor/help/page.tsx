import { HandHeart, PersonStanding, MessageSquare } from 'lucide-react'
import SingleCard from '@/components/InstructorPage/SingleCard/SingleCard'
import SectionTitle from '@/components/InstructorPage/SectionTitle/SectionTitle'
export default async function page() {
	const cardArray = [
		{
			title: 'Teaching center',
			description: 'Find articles about teaching on Learnify - from course creation to marketing.',
			icon: PersonStanding,
		},
		{
			title: 'Instructor community',
			description: 'Share your progress and ask questions of other instructors in our community.',
			icon: MessageSquare,
		},
		{
			title: 'Technical assistance',
			description: "Can't find what you need? Our support team will be happy to help you.",
			icon: HandHeart,
		},
	]
	return (
		<div>
			<SectionTitle title='Resources' />
			<div className='flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center'>
				{cardArray.map(card => {
					return <SingleCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
				})}
			</div>
		</div>
	)
}
