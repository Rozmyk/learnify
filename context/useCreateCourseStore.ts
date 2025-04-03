import { create } from 'zustand'
import { CourseProps } from '@/types/api'
type CreateCourseResponse = {
	success: boolean
	message: string
	course?: CourseProps
}

type CreateCourseStore = {
	data: Partial<CourseProps>
	thumbnailData: File | null | Blob
	temporaryData: Partial<CourseProps>
	loadCourse: (id: string) => void
	setData: (newData: Partial<CourseProps>) => void
	setThumbnailData: (newData: File | null | Blob) => void
	setTemporaryData: (newData: Partial<CourseProps>) => void
	isStepValid: (step: number) => boolean
	reset: () => void
	createCourse: () => Promise<CreateCourseResponse>
	updateCourse: () => void
	updateCourseLoading: boolean
	completedSteps: string[]
	setCompletedSteps: (steps: string[]) => void
	loading: boolean
	createCourseLoading: boolean
}

export const useCreateCourseStore = create<CreateCourseStore>((set, get) => ({
	data: {},
	thumbnailData: null,
	updateCourseLoading: false,
	setThumbnailData: (newData: File | null | Blob) =>
		set({
			thumbnailData: newData,
		}),
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
	updateCourse: async (): Promise<{ success: boolean; message: string; course?: CourseProps }> => {
		const { temporaryData, setData, thumbnailData } = get()
		set({ updateCourseLoading: true })

		if (
			!temporaryData.title ||
			!temporaryData.type_id ||
			!temporaryData.times_commited_id ||
			!temporaryData.categories_id ||
			!temporaryData.id
		) {
			console.log('nie ma wszystkich danych')
			console.table({
				title: temporaryData.title,
				type_id: temporaryData.type_id,
				times_commited_id: temporaryData.times_commited_id,
				categories_id: temporaryData.categories_id,
				id: temporaryData.id,
			})

			console.log(temporaryData)
			return { success: false, message: 'All required fields must be filled.' }
		}

		setData(temporaryData)

		try {
			const formData = new FormData()

			formData.append('title', temporaryData.title)
			formData.append('type_id', temporaryData.type_id)
			formData.append('times_commited_id', temporaryData.times_commited_id)
			formData.append('categories_id', temporaryData.categories_id)
			formData.append('course_id', temporaryData.id)
			console.log(formData)
			const optionalFields: (keyof CourseProps)[] = [
				'subtitle',
				'description',
				'price_id',
				'currencies_id',
				'lang_id',
				'level_id',
				'welcome_message',
				'congratulatory_message',
			]

			optionalFields.forEach(field => {
				const value = temporaryData[field]
				if (value !== undefined && value !== null && value !== '') {
					formData.append(field, String(value))
				}
			})

			if (thumbnailData) {
				formData.append('thumbnail', thumbnailData)
			}

			const response = await fetch('/api/course/update', {
				method: 'PUT',
				body: formData,
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Failed to update course')
			}

			set({ updateCourseLoading: false, data: temporaryData, thumbnailData: null })
			return { success: true, message: 'Course updated successfully!', course: result }
		} catch (error) {
			console.error(error)
			set({ updateCourseLoading: false })
			return { success: false, message: 'Something went wrong.' }
		}
	},
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

		if (!data.title || !data.type_id || !data.times_commited_id || !data.categories_id) {
			return { success: false, message: 'All fields are required.' }
		}

		set({ createCourseLoading: true })

		try {
			const formData = new FormData()
			formData.append('title', data.title)
			formData.append('type_id', data.type_id)
			formData.append('times_commited_id', data.times_commited_id)
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
			return { success: true, message: 'Course created successfully!', course: result.course }
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
				return !!data.type_id
			case 2:
				return !!data.title && data.title.trim().length >= 0
			case 3:
				return !!data.categories_id
			case 4:
				return !!data.times_commited_id
			default:
				return false
		}
	},
	reset: () => set({ data: {} }),
}))
