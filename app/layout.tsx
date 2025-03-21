import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const geistSans = Geist({
	display: 'swap',
	subsets: ['latin'],
})

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
