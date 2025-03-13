import { TabsWrapper } from '@/components/TabsWrapper/TabsWrapper'
import PageContainer from '@/components/PageContainer/PageContainer'
export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<PageContainer>
			<div className='p-4'>
				<h1 className='text-4xl my-4 font-semibold mb-4'>My courses</h1>
				<TabsWrapper>{children}</TabsWrapper>
			</div>
		</PageContainer>
	)
}
