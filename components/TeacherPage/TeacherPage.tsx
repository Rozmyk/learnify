'use client'
import { CourseProps, ProfileDataProps } from '@/types/api'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'
import Loader from '../ui/loader'
import CourseCard from '../ui/CourseCard'

interface UserStats {
	coursesCount: number
	reviewsCount: number
	averageRating: number
}
const SingleStats = ({ title, value }: { title: string; value: number }) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='font-semibold '>{title}</p>
			<p className='text-3xl font-semibold text-muted-foreground'>{value}</p>
		</div>
	)
}

const TeacherPage = ({ userData }: { userData: ProfileDataProps }) => {
	const [userCourse, setUserCourse] = useState<CourseProps[] | null>(null)
	const [userStats, setUserStats] = useState<UserStats | null>(null)
	const [userStatsLoading, setUserStatsLoading] = useState<boolean>(true)
	const [userCourseLoading, setUserCourseLoading] = useState<boolean>(true)
	useEffect(() => {
		const fetchUserCourse = async () => {
			try {
				const response = await fetch(`/api/course/author_id?author_id=${userData.id}`)
				if (!response.ok) {
					console.error('Response error:', response.status)
					return
				}
				const data = await response.json()
				setUserCourse(data.courses)
				setUserCourseLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		const fetchUserStats = async () => {
			try {
				const response = await fetch(`/api/user/getUserCourseStats?userId=${userData.id}`)
				if (!response.ok) {
					console.error('Response error:', response.status)
					return
				}
				const data = await response.json()
				setUserStats(data)
				setUserStatsLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
		if (userData.id) {
			fetchUserCourse()
			fetchUserStats()
		}
	}, [userData.id])
	return (
		<div className='max-w-2x w-full mx-auto p-6 shadow-lg rounded-lg my-10 border border-border flex md:flex-row flex-col-reverse gap-20'>
			<div className='w-full md:w-4/5'>
				<div>
					<p className='text-muted-foreground'>Instructors</p>
					<h1 className='text-5xl font-semibold mb-2'>{userData.username}</h1>
					<p className='font-semibold'>{userData.header}</p>
				</div>
				{userStatsLoading ? (
					<div></div>
				) : (
					<div className='flex justify-start items-center gap-8 my-10'>
						{userStats?.coursesCount && <SingleStats title='Courses count' value={userStats?.coursesCount} />}
						{userStats?.reviewsCount && <SingleStats title='Reviews' value={userStats?.reviewsCount} />}
					</div>
				)}
				<div>
					<p className='font-semibold my-4'>About me</p>
					<p className='text-muted-foreground'>{userData.description}</p>
				</div>
				<div>
					{userCourseLoading ? (
						<div className='w-full h-full flex justify-center items-center my-8'>
							<Loader />
						</div>
					) : (
						<div className='mt-8'>
							<p className='font-semibold my-4'>My courses ({userCourse?.length})</p>
							<div className='grid  grid-cols-1 md:grid-cols-2 gap-4'>
								{userCourse?.map(course => {
									return <CourseCard {...course} key={course.id} />
								})}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className='w-full md:w-1/5 flex justify-start items-center flex-col p-2'>
				<div className='relative h-48 w-48 min-w-48 min-h-48 rounded-full overflow-hidden  '>
					<Image src={userData.avatar_url} fill alt='User profile photo' />
				</div>
				<div className='flex flex-col w-full gap-4 mt-8'>
					<Button>Send message</Button>
					<Button variant='outline'>Website</Button>
				</div>
			</div>
		</div>
	)
}

export default TeacherPage
