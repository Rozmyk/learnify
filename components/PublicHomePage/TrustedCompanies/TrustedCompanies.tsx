import Image from 'next/image'

const TrustedCompanies = () => {
	const logosArray = [
		{ src: '/logo/cisco_logo.svg', alt: 'Logo Cisco' },
		{ src: '/logo/citi_logo.svg', alt: 'Logo Citi' },
		{ src: '/logo/ericsson_logo.svg', alt: 'Logo Ericsson' },
		{ src: '/logo/hewlett_packard_enterprise_logo.svg', alt: 'Logo Hewlett Packard Enterprise' },
		{ src: '/logo/procter_gamble_logo.svg', alt: 'Logo Procter & Gamble' },
		{ src: '/logo/samsung_logo.svg', alt: 'Logo Samsung' },
		{ src: '/logo/vimeo_logo_resized-2.svg', alt: 'Logo Vimeo' },
		{ src: '/logo/volkswagen_logo.svg', alt: 'Logo Volkswagen' },
	]

	return (
		<div className='flex flex-col justify-center items-center my-20'>
			<p className='mb-8 text-muted-foreground text-lg font-semibold'>
				Trusted by more than 16,000 companies and millions of users from around the world
			</p>
			<div className='grid grid-cols-4 gap-6 w-full max-w-5xl md:flex md:justify-between md:items-center'>
				{logosArray.map(item => (
					<Image
						height={50}
						width={70}
						src={item.src}
						alt={item.alt}
						key={item.alt}
						className='mx-auto w-16 md:w-[70px]'
					/>
				))}
			</div>
		</div>
	)
}

export default TrustedCompanies
