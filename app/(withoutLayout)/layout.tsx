export default function WithoutLayout({ children }: { children: React.ReactNode }) {
	return <body className='text-foreground'>{children}</body>
}
