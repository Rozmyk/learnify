import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
const InstructorNavbar = ({ userId }: { userId: string }) => {
	return (
		<div className='w=full h-16 flex justify-end items-center px-8 '>
			<Link href='/'>
				<Button variant='ghost'>Course participant</Button>
			</Link>
			<Button className='text-muted-foreground' size='icon' variant='ghost'>
				<Bell size={16} />
			</Button>
			<div className='w-8 h-8 min-h-8 min-w-8 relative rounded-full overflow-hidden bg-red-400'></div>
		</div>
	)
}

export default InstructorNavbar
