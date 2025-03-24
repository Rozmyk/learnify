import { create } from 'zustand'
import { CourseProps } from '@/types/api'

type CreateCourseStore = {
	data: Partial<CourseProps>
	loadCourse: (id: string) => void
	setData: (newData: Partial<CourseProps>) => void
	isStepValid: (step: number) => boolean
	reset: () => void
	completedSteps: string[]
	setCompletedSteps: (steps: string[]) => void
	loading: boolean
}

export const useCreateCourseStore = create<CreateCourseStore>((set, get) => ({
	data: {},
	loading: true,
	completedSteps: [],
	loadCourse: async (id: string) => {
		set({ loading: true })
		try {
			const response = await fetch(`/api/course/id?id=${id}`)
			if (!response.ok) {
				throw new Error('Failed to fetch course')
			}
			const data = await response.json()

			set({ data, loading: false })
		} catch (error) {
			console.error(error)
			set({ loading: false })
		}
	},
	setCompletedSteps: steps => set(() => ({ completedSteps: steps })),
	setData: newData =>
		set(state => ({
			data: {
				...state.data,
				...newData,
			},
		})),
	isStepValid: step => {
		const { data } = get()

		switch (step) {
			case 1:
				return !!data.type
			case 2:
				return !!data.title && data.title.trim().length >= 0
			case 3:
				return !!data.categories_id
			case 4:
				return !!data.time_commitment
			default:
				return false
		}
	},
	reset: () => set({ data: {} }),
}))
