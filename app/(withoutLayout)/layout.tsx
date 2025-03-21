export default function WithoutLayout({ children }: { children: React.ReactNode }) {
	return <body className='bg-background text-foreground'>{children}</body>
}
