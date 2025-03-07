import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SingleFooterSection = ({ title, children }: { title: string; children: ReactNode }) => {
	return (
		<div>
			<h4 className='font-semibold text-lg'>{title}</h4>
			{children}
		</div>
	)
}

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='w-full border-t border-border '>
			<div className='grid grid-cols-4 p-4'>
				<SingleFooterSection title='Information'>
					<p>Informationdd</p>
				</SingleFooterSection>
				<SingleFooterSection title='Information'>
					<p>Informationdd</p>
				</SingleFooterSection>
				<SingleFooterSection title='Information'>
					<p>Informationdd</p>
				</SingleFooterSection>
				<SingleFooterSection title='Information'>
					<p>xddd</p>
				</SingleFooterSection>
			</div>
			<div className='flex justify-between bg-secondary p-4'>
				<Link className='text-xl' href={'/'}>
					Learnify
				</Link>
				<p className='text-sm text-muted-foreground'>&copy; {currentYear}</p>
			</div>
		</footer>
	)
}

export default Footer
