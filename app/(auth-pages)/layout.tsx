import PageContainer from '@/components/PageContainer/PageContainer'
export default async function Layout({ children }: { children: React.ReactNode }) {
	return <PageContainer>{children}</PageContainer>
}
