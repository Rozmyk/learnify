import { ThemeProvider } from 'next-themes'

export default function WithoutLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
