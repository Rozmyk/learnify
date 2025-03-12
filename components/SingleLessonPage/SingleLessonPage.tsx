'use client'
import { SingleLessonProps } from '@/types/api'
import Loader from '../ui/loader'
import { useState, useEffect } from 'react'
const SingleLessonPage = ({ lessonId }: { lessonId: string | null }) => {
	const [loading, setLoading] = useState(true)
	return <div>{lessonId}</div>
}

export default SingleLessonPage
