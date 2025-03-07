import { ReactNode } from 'react'
import Link from 'next/link'

const SingleFooterSection = ({ title, children }: { title: string; children: ReactNode }) => (
	<div>
		<h4 className='font-semibold text-lg mb-2'>{title}</h4>
		<div className='space-y-1 flex flex-col text-sm text-muted-foreground'>{children}</div>
	</div>
)

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='w-full border-t border-border mt-10  flex flex-col justify-center items-center'>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 max-w-7xl w-full '>
				<SingleFooterSection title='Company'>
					<Link href='/about'>About Us</Link>
					<Link href='/careers'>Careers</Link>
					<Link href='/blog'>Blog</Link>
				</SingleFooterSection>
				<SingleFooterSection title='Support'>
					<Link href='/help'>Help Center</Link>
					<Link href='/contact'>Contact Us</Link>
					<Link href='/faq'>FAQ</Link>
				</SingleFooterSection>
				<SingleFooterSection title='Legal'>
					<Link href='/terms'>Terms of Service</Link>
					<Link href='/privacy'>Privacy Policy</Link>
				</SingleFooterSection>
				<SingleFooterSection title='Social Media'>
					<Link href='https://facebook.com'>Facebook</Link>
					<Link href='https://twitter.com'>Twitter</Link>
					<Link href='https://linkedin.com'>LinkedIn</Link>
				</SingleFooterSection>
			</div>
			<div className='flex justify-center  w-full items-center border-t border-border p-4 '>
				<div className='max-w-7xl flex justify-between items-center w-full'>
					<Link className='text-xl font-semibold' href='/'>
						Learnify
					</Link>
					<p className='text-sm text-muted-foreground'>&copy; {currentYear} Learnify. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
