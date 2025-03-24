export default function PageContainer({ children }: { children: React.ReactNode }) {
	return <div className='flex flex-col max-w-7xl   w-full mx-auto'>{children}</div>
}
