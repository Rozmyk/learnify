import { create } from 'zustand'
import { CourseProps } from '@/types/api'

type CreateCourseStore = {
	data: Partial<CourseProps>
	temporaryData: Partial<CourseProps>
	loadCourse: (id: string) => void
	setData: (newData: Partial<CourseProps>) => void
	setTemporaryData: (newData: Partial<CourseProps>) => void
	isStepValid: (step: number) => boolean
	reset: () => void
	createCourse: () => void
	updateCourse: () => void
	completedSteps: string[]
	setCompletedSteps: (steps: string[]) => void
	loading: boolean
	createCourseLoading: boolean
}

export const useCreateCourseStore = create<CreateCourseStore>((set, get) => ({
	data: {},
	temporaryData: {},
	setTemporaryData: newData =>
		set(state => ({
			temporaryData: {
				...state.data,
				...newData,
			},
		})),
	loading: true,
	createCourseLoading: false,
	completedSteps: [],
	updateCourse: async () => {},
	loadCourse: async (id: string) => {
		set({ loading: true })
		try {
			const response = await fetch(`/api/course/id?id=${id}`)
			if (!response.ok) {
				throw new Error('Failed to fetch course')
			}
			const data = await response.json()

			set({ data, temporaryData: data, loading: false })
		} catch (error) {
			console.error(error)
			set({ loading: false })
		}
	},
	setCompletedSteps: steps => set(() => ({ completedSteps: steps })),
	createCourse: async () => {
		const { data, reset } = get()

		if (!data.title || !data.type || !data.time_commitment || !data.categories_id) {
			return { success: false, message: 'All fields are required.' }
		}

		set({ createCourseLoading: true })

		try {
			const formData = new FormData()
			formData.append('title', data.title)
			formData.append('type', data.type)
			formData.append('time_commitment', data.time_commitment)
			formData.append('categories_id', data.categories_id)

			const response = await fetch('/api/course/create', {
				method: 'POST',
				body: formData,
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Failed to create course')
			}

			set({ data: {}, createCourseLoading: false })
			reset()
			return { success: true, message: 'Course created successfully!', course: result }
		} catch (error) {
			console.error(error)
			set({ createCourseLoading: false })
			return { success: false, message: 'Something went wrong.' }
		}
	},

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
