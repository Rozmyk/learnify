import SingleCard from '@/components/InstructorPage/SingleCard/SingleCard'
import { MonitorPlay, ChartBar, Tag } from 'lucide-react'
import SectionTitle from '@/components/InstructorPage/SectionTitle/SectionTitle'
export default async function page() {
	const cardArray = [
		{
			title: 'Test video',
			description: 'Get a free opinion from Learnify film experts on audio, video and course delivery.',
			icon: MonitorPlay,
		},
		{
			title: 'Market insights',
			description: 'Get market data from across the Learnify platform to create effective courses.',
			icon: ChartBar,
		},
		{
			title: 'Aggregate creation of coupons',
			description: 'Create multiple coupons at once by uploading a CSV file.',
			icon: Tag,
		},
	]
	return (
		<div>
			<SectionTitle title='Tools' />
			<div className='flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center'>
				{cardArray.map(card => {
					return <SingleCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
				})}
			</div>
		</div>
	)
}
