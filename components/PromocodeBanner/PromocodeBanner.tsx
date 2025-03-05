'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '../ui/button'

const PromocodeBanner = () => {
	const code = 'testvalue'
	const discount = '30'
	const [isVisible, setIsVisible] = useState(true)
	const [timeLeft, setTimeLeft] = useState(7 * 60 * 60 + 28 * 60 + 30)

	useEffect(() => {
		if (timeLeft <= 0) return
		const interval = setInterval(() => {
			setTimeLeft(prev => prev - 1)
		}, 1000)
		return () => clearInterval(interval)
	}, [timeLeft])

	const formatTime = (seconds: number) => {
		const h = Math.floor(seconds / 3600)
		const m = Math.floor((seconds % 3600) / 60)
		const s = seconds % 60
		return `${h}h ${m}m ${s}s`
	}

	return (
		isVisible && (
			<div className='h-16 bg-primary w-full flex flex-col justify-center items-center relative '>
				<p className='font-medium text-secondary  '>
					Use the code <span className='font-bold uppercase'>{code}</span> now to save{' '}
					<span className='font-bold'>{discount}%</span>
				</p>
				<p className='font-semibold text-secondary'>Ends in {formatTime(timeLeft)}</p>
				<div className='absolute top-1 right-1'>
					<Button
						onClick={() => {
							setIsVisible(false)
						}}
						size='icon'
						variant='link'
						className='text-secondary'>
						<X />
					</Button>
				</div>
			</div>
		)
	)
}

export default PromocodeBanner
