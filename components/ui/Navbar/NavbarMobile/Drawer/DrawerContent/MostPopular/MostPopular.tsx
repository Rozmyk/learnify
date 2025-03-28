import { CategoryProps } from '@/types/api'
import SingleLink from '../SingleLink/SingleLink'

const MostPopular = ({
	categoriesData,
	handleCloseDrawer,
}: {
	categoriesData: null | CategoryProps[]
	handleCloseDrawer: () => void
}) => {
	return (
		<div>
			<p className='font-semibold my-2'>Most popular</p>
			<div className='flex flex-col justify-center items-start'>
				{categoriesData?.map(category => {
					return (
						<span key={category.id} onClick={handleCloseDrawer}>
							<SingleLink content={category.name} href={`/courses/${category.slug}`} />
						</span>
					)
				})}
			</div>
		</div>
	)
}

export default MostPopular
