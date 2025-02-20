import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
const FavButton = () => {
	return (
		<Button className='rounded-full' size='icon' variant='outline'>
			<Heart />
		</Button>
	)
}

export default FavButton
