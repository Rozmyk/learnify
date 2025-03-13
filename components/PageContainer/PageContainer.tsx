export default function PageContainer({ children }: { children: React.ReactNode }) {
	return <div className='flex flex-col max-w-7xl gap-20 w-full mx-auto'>{children}</div>
}
