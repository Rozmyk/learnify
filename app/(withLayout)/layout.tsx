import Navbar from '@/components/ui/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import PromocodeBanner from '@/components/PromocodeBanner/PromocodeBanner'
import CategoryMenu from '@/components/ui/CategoryMenu/CategoryMenu'

export default function WithLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='min-h-screen flex flex-col items-center'>
			<div className='flex-1 w-full flex flex-col items-center'>
				<PromocodeBanner />
				<Navbar />
				<CategoryMenu />
				<div className='flex flex-col gap-20 w-full'>{children}</div>
				<Footer />
			</div>
		</main>
	)
}
