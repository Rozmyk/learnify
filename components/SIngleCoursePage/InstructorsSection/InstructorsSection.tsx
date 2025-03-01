import { ProfileDataProps } from '@/types/api'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Award, SquarePlay, Star } from 'lucide-react'
import StatItem from '@/components/StatItem/StatItem'
import Skeleton from '@/components/ui/skeleton'
import SectionTitle from '@/components/SectionTitle/SectionTitle'

interface UserStats {
	coursesCount: number
	reviewsCount: number
	averageRating: number
}

const InstructorsSection = ({ username, avatar_url, description, header, id }: ProfileDataProps) => {
	const [stats, setStats] = useState<UserStats | null>(null)

	const [loading, setLoading] = useState<boolean>(true)
	useEffect(() => {
		const fetchUserStats = async () => {
			try {
				const response = await fetch(`/api/user/getUserCourseStats?userId=${id}`)

				if (!response.ok) {
					throw new Error('Failed to fetch user stats')
				}

				const data = await response.json()
				setStats(data)
			} catch (err: any) {
				console.log(err.message)
			} finally {
				setLoading(false)
			}
		}

		if (id) {
			fetchUserStats()
		}
	}, [id])
	return (
		<div>
			<SectionTitle>Instructor</SectionTitle>
			<div className='mb-4'>
				{' '}
				<Link className='font-semibold text-lg underline' href={`/user/${username}`}>
					{username}
				</Link>
				{header && <p className='text-muted-foreground'>{header}</p>}
			</div>
			<div className='flex justify-start items-center mb-4 gap-4'>
				<div className='w-32 h-32 min-w-32 min-h-32 relative rounded-full overflow-hidden'>
					<Image fill alt='user photo' src={avatar_url} />
				</div>
				<div className='flex flex-col justify-start items-start gap-2'>
					{loading ? (
						<div className='w-full flex flex-col justify-start items-start gap-4 h-full'>
							<Skeleton className='w-36 h-4' />
							<Skeleton className='w-32 h-4' /> <Skeleton className='w-32 h-4' />
						</div>
					) : (
						<>
							<StatItem icon={Star} value={`${stats?.averageRating} Instructor evaluation`} />
							<StatItem icon={SquarePlay} value={`${stats?.coursesCount} courses`} />

							<StatItem icon={Award} value={`${stats?.reviewsCount} reviews`} />
						</>
					)}
				</div>
			</div>
			<p className='text-sm'>{description}</p>
		</div>
	)
}

export default InstructorsSection
