import { CategoryProps } from '@/types/api'
import SingleLink from '../SingleLink/SingleLink'

const MostPopular = ({ categoriesData }: { categoriesData: null | CategoryProps[] }) => {
	return (
		<div>
			<p className='font-semibold my-2'>Most popular</p>
			<div className='flex flex-col justify-center items-start'>
				{categoriesData?.map(category => {
					return <SingleLink content={category.name} href={`/courses/${category.slug}`} key={category.id} />
				})}
			</div>
		</div>
	)
}

export default MostPopular
