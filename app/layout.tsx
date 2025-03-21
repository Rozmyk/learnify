import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const geistSans = Geist({
	display: 'swap',
	subsets: ['latin'],
})
export const metadata = {
	title: {
		default: 'Learnify – Online Learning Platform',
		template: '%s | Learnify',
	},
	description:
		'Learnify helps you learn online with high-quality courses taught by experts. Boost your skills in development, design, marketing, and more.',
	metadataBase: new URL('https://learnify-ochre.vercel.app/'),
	openGraph: {
		title: 'Learnify – Online Courses and Training',
		description:
			'Join Learnify to access a variety of online courses taught by professionals. Learn anytime, anywhere.',
		url: 'https://learnify-ochre.vercel.app/',
		siteName: 'Learnify',

		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Learnify – Learn from experts',
		description: 'Explore online courses on Learnify and learn from the best instructors in the industry.',
		images: ['/og-image.jpg'],
		creator: '@learnify',
	},
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={geistSans.className} suppressHydrationWarning>
			<body className='bg-background text-foreground'>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
