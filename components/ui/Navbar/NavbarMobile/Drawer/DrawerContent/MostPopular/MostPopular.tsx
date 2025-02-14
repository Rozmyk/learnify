import { CategoryProps } from '@/types/api'

const MostPopular = ({ categoriesData }: { categoriesData: null | CategoryProps[] }) => {
	return (
		<div>
			<p className='font-semibold'>Most popular</p>
			{categoriesData?.map(category => {
				return <div key={category.id}>{category.name}</div>
			})}
		</div>
	)
}

export default MostPopular
