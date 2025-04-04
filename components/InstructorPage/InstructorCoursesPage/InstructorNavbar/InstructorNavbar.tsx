'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { ProfileDataProps } from '@/types/api'
import Loader from '@/components/ui/loader'
import { ChevronLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import ActionMenu from '@/components/ui/Navbar/ActionMenu/ActionMenu'
import StatusBadge from './StatusBadge/StatusBadge'

const InstructorNavbar = ({ userId }: { userId: string }) => {
	const [userData, setUserData] = useState<ProfileDataProps | null>(null)
	const pathname = usePathname()
	const { data, temporaryData, updateCourse, updateCourseLoading, thumbnailData } = useCreateCourseStore()
	const params = useParams()
	const courseId = params.id
	const primaryPaths = ['/instructor/course', '/instructor/tools', '/instructor/help']
	const isPrimaryNavbar = primaryPaths.some(path => pathname.startsWith(path)) && !pathname.includes('/manage')

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(`/api/user/id?userId=${userId}`)
				if (!response.ok) {
					throw new Error('Failed to fetch user data')
				}
				const data = await response.json()
				setUserData(data.userData)
			} catch (err) {
				console.log(err)
			}
		}
		if (userId) {
			fetchUserData()
		}
	}, [userId])

	if (isPrimaryNavbar) {
		return (
			<div className='w-full h-12 flex justify-end items-center px-8 py-2  gap-1 mb-10 '>
				<Link href='/'>
					<Button variant='ghost'>Course participant</Button>
				</Link>
				<Button className='text-muted-foreground' size='icon' variant='ghost'>
					<Bell size={16} />
				</Button>
				<ActionMenu
					email={userData?.email ?? ''}
					username={userData?.username ?? ''}
					avatarUrl={userData?.avatar_url ?? ''}
				/>
			</div>
		)
	}

	return (
		<div className='w-full h-12 flex justify-between items-center px-8 bg-primary text-secondary mb-10'>
			<div className='flex justify-start items-center gap-2'>
				<Link href={'/instructor/courses'}>
					<Button variant='ghost'>
						<ChevronLeft size={16} /> Back to courses
					</Button>
				</Link>
				<h2 className='font-semibold'>{data.title}</h2>
				{data.status && <StatusBadge status={data.status} />}
				<p className='text-sm'>0 min of uploaded video content</p>
			</div>
			<div className='flex items-center gap-2'>
				<Link href={`/course/draft/${courseId}`}>
					<Button>Preview</Button>
				</Link>
				<Button onClick={updateCourse} disabled={data == temporaryData && !thumbnailData} variant='secondary'>
					{updateCourseLoading ? <Loader /> : 'Save'}
				</Button>
			</div>
		</div>
	)
}

export default InstructorNavbar
