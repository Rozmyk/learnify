'use client'
import { useEffect, useState } from 'react'
import { LucideIcon, Monitor, NotepadText } from 'lucide-react'
import { useCreateCourseStore } from '@/context/useCreateCourseStore'
import SingleCategoryCard from './SingleCategoryCard/SingleCategoryCard'
import Loader from '@/components/ui/loader'
import StepTitle from '../StepTitle/StepTitle'
import { TypeProps } from '@/types/api'

const StepOne = () => {
	const { setData, data, completedSteps, setCompletedSteps } = useCreateCourseStore()
	const [selected, setSelected] = useState<string | null>(data.types?.value ?? null)
	const [types, setTypes] = useState<TypeProps[] | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchLevels = async () => {
			try {
				const response = await fetch('/api/types')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()

				setTypes(data.types)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
		fetchLevels()
	}, [])

	const handleCategoryClick = (value: string) => {
		setData({ type_id: value })
		setSelected(value)
	}
	useEffect(() => {
		if (selected && !completedSteps.includes('1')) {
			setCompletedSteps([...completedSteps, '1'])
		}
	}, [selected])

	return (
		<>
			<StepTitle title="First, let's find out what kind of course you are creating." />

			{loading ? (
				<div className='flex justify-center items-center w-full py-10'>
					<Loader />
				</div>
			) : (
				<div className='flex justify-center items-center gap-4 py-8'>
					{types?.map(item => (
						<SingleCategoryCard
							key={item.value}
							value={item.value}
							text={item.name}
							description={item.description}
							iconName={item.icon}
							onClick={() => handleCategoryClick(item.value)}
							selected={item.value === selected}
						/>
					))}
				</div>
			)}
		</>
	)
}

export default StepOne
