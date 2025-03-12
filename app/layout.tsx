import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/ui/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import './globals.css'
import PromocodeBanner from '@/components/PromocodeBanner/PromocodeBanner'
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
							<PromocodeBanner />
							<Navbar />
							<CategoryMenu />
							<div className='flex flex-col max-w-7xl gap-20 w-full '>{children}</div>
							<Footer />
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
