import { signOutAction } from '@/app/actions'
const OtherServices = () => {
	return (
		<div>
			<p className='font-semibold my-2'>Other options</p>
			<span className='py-1 px-0.5 cursor-pointer' onClick={signOutAction}>
				Logout
			</span>
		</div>
	)
}

export default OtherServices
