import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/ui/Navbar/Navbar'
import './globals.css'
import CategoryMenu from '@/components/ui/CategoryMenu/CategoryMenu'
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Learnify',
	description: 'Learn platform',
}

const geistSans = Geist({
	display: 'swap',
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={geistSans.className} suppressHydrationWarning>
			<body className='bg-background text-foreground'>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
					<main className='min-h-screen flex flex-col items-center'>
						<div className='flex-1 w-full flex flex-col  items-center'>
							<Navbar />
							<CategoryMenu />
							<div className='flex flex-col gap-20 max-w-7xl w-full '>{children}</div>
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
