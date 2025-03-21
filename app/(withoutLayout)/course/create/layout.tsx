import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ProgressComponent from '@/components/ProgressComponent/ProgressComponent'
export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ step: string }>
}) {
	const step = (await params).step

	return (
		<div className='flex flex-col justify-between items-center md:max-h-screen h-full'>
			<div className='border-b border-border  h-16 max-h-16 w-full'>
				<div className='flex justify-between items-center p-4 h-full'>
					<div className='flex justify-start items-center gap-8'>
						<Link className='text-xl font-semibold' href={'/'}>
							Learnify
						</Link>
						<p className=' text-muted-foreground text-lg'>Step {step} of 4</p>
					</div>
					<Link href='/instructor/courses'>
						<Button>Close</Button>
					</Link>
				</div>
				<ProgressComponent value={60} className='h-1' />
			</div>
			<div className='flex h-[calc(100vh-128px)] flex-1'>{children}</div>

			<div className='border-t  border-border w-full max-h-16 h-16 '>
				<div className='flex justify-between items-center p-4 h-full'>
					<Button variant='outline'>Back</Button>
					<Button>Continue</Button>
				</div>
			</div>
		</div>
	)
}
