interface SkeletonProps {
	className?: string
}
import { useTheme } from 'next-themes'

export default function Skeleton({ className = '' }: SkeletonProps) {
	const { theme } = useTheme()

	return (
		<div
			className={`animate-pulse ${theme == 'light' ? 'bg-neutral-300' : 'bg-neutral-800'} rounded-lg ${className}`}
		/>
	)
}
