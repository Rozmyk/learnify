import { ProfileDataProps } from '@/types/api'
import Image from 'next/image'
import { Button } from '../ui/button'

const TeacherPage = ({ userData }: { userData: ProfileDataProps }) => {
	return (
		<div className='max-w-2x w-full mx-auto p-6 shadow-lg rounded-lg mt-10 border border-border flex gap-20'>
			<div className='w-full md:w-4/5'>
				<div>
					<p className='text-muted-foreground'>Instructors</p>
					<h1 className='text-4xl font-semibold'>{userData.username}</h1>
					<p className='font-semibold'>{userData.header}</p>
				</div>
				<div className='text-muted-foreground'>
					<p className='font-semibold mb-4'>About me</p>
					<p>{userData.description}</p>
				</div>
				<div>
					<p>My courses</p>
				</div>
			</div>
			<div className='w-full md:w-1/5 flex justify-start items-center flex-col p-2'>
				<div className='relative h-48 w-48 min-w-48 min-h-48 rounded-full overflow-hidden  '>
					<Image src={userData.avatar_url} fill alt='User profile photo' />
				</div>
				<div className='flex flex-col w-full gap-2 mt-4'>
					<Button>Send message</Button>
					<Button>Website</Button>
				</div>
			</div>
		</div>
	)
}

export default TeacherPage
