'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { ProfileDataProps } from '@/types/api'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'

const InstructorNavbar = ({ userId }: { userId: string }) => {
	const [userData, setUserData] = useState<ProfileDataProps | null>(null)
	const pathname = usePathname()

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
			<div className='w-full h-12 flex justify-end items-center px-8 gap-1 mb-10 '>
				<Link href='/'>
					<Button variant='ghost'>Course participant</Button>
				</Link>
				<Button className='text-muted-foreground' size='icon' variant='ghost'>
					<Bell size={16} />
				</Button>
				<div className='w-8 h-8 min-h-8 min-w-8 relative rounded-full overflow-hidden bg-red-400'>
					{userData && <Image src={userData?.avatar_url} fill alt='user photo' />}
				</div>
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
				<h2 className='font-semibold'>course title</h2>
				<span className='bg-secondary text-primary px-1 py-2 rounded-lg text-xs'>Operating mode</span>
				<p className='text-sm'>0 min of uploaded video content</p>
			</div>
			<div className='flex items-center gap-2'>
				<Button>Preview</Button>
				<Button variant='secondary'>Save</Button>
			</div>
		</div>
	)
}

export default InstructorNavbar
