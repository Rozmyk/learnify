import { useState, useEffect } from 'react'
import { ProfileDataProps } from '@/types/api'
import Image from 'next/image'
import StarRating from '@/components/ui/starRating'
import Link from 'next/link'
import { Star } from 'lucide-react'
interface UserStats {
	coursesCount: number
	reviewsCount: number
	averageRating: number
}

const SingleInstructorCard = ({ username, avatar_url, header, id }: ProfileDataProps) => {
	const [userStats, setUserStats] = useState<UserStats | null>(null)
	useEffect(() => {
		const getUserStats = async () => {
			try {
				const response = await fetch(`/api/user/getUserCourseStats?userId=${id}`)
				if (!response.ok) {
					throw new Error('Failed fetch userStats')
				}
				const data = await response.json()

				setUserStats(data)
			} catch (err) {
				console.log(err)
			}
		}
		if (id) {
			getUserStats()
		}
	}, [id])
	return (
		<Link
			href={`/user/${username}`}
			className='flex p-4 border border-border gap-8 max-w-72 w-72 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px]'>
			<div className='relative h-16 min-h-16 min-w-16 w-16 rounded-full overflow-hidden border border-border'>
				<Image src={avatar_url} fill alt='user profile' />
			</div>
			<div>
				<h4 className='font-semibold'>{username}</h4>
				<p className='text-sm text-muted-foreground'>{header}</p>
				<div className='flex justify-start items-center gap-1'>
					<div className='flex justify-start items-center gap-1 text-orange-500'>
						<p className='text-xs font-semibold '>{userStats?.averageRating}</p>
						<span>★</span>
					</div>
					<p className='text-xs text-orange-400'>Instructor rating</p>
				</div>
				<p className='text-xs text-muted-foreground'>
					<span className='font-semibold'>{userStats?.coursesCount}</span> courses
				</p>
			</div>
		</Link>
	)
}

export default SingleInstructorCard
