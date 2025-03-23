'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { ProfileDataProps } from '@/types/api'
import Image from 'next/image'
const InstructorNavbar = ({ userId }: { userId: string }) => {
	const [userData, setUserData] = useState<ProfileDataProps | null>(null)
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(`/api/user/id?userId=${userId}`)
				if (!response.ok) {
					throw new Error('Failed to fetch  userData')
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
	return (
		<div className='w=full h-16 flex justify-end items-center px-8 gap-1 '>
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

export default InstructorNavbar
