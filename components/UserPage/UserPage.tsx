import { ProfileDataProps } from '@/types/api'
import Image from 'next/image'
const UserPage = ({ userData }: { userData: ProfileDataProps }) => {
	return (
		<div className='max-w-3x w-full mx-auto p-6 shadow-lg rounded-lg mt-10 border border-border'>
			<div className='flex flex-col md:flex-row items-center gap-4 mb-6'>
				<Image
					src={userData.avatar_url}
					alt={`${userData.username}'s avatar`}
					width={100}
					height={100}
					className='rounded-full border border-border shadow-md'
				/>
				<div className='text-center md:text-left'>
					<h1 className='text-2xl font-bold'>{userData.username}</h1>
					{userData.header && <p>{userData.header}</p>}
					{userData.website && (
						<a
							href={userData.website}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 hover:underline block mt-2'>
							{userData.website}
						</a>
					)}
				</div>
			</div>

			{userData.description && (
				<p className='mb-4 text-muted-foreground text-center md:text-left'>{userData.description}</p>
			)}

			{userData.email && (
				<div className='mt-4 text-center md:text-left'>
					<p className='text-sm text-gray-500'>Email:</p>
					<p className='text-lg'>{userData.email}</p>
				</div>
			)}

			<div className='mt-10 border-t border-border pt-6'>
				<h2 className='text-xl font-bold mb-4 text-center md:text-left'>Courses attended by {userData.username}</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<p className='text-gray-500'>No courses available.</p>
				</div>
			</div>
		</div>
	)
}

export default UserPage
