import PublicHeader from '../PublicHeader/PublicHeader'
import SectionTitle from '../SectionTitle/SectionTitle'
import ChooseCourse from './ChooseCourse/ChooseCourse'
const PublicHomePage = () => {
	return (
		<>
			<PublicHeader />

			<SectionTitle additionalText='From key skills to technical issues, Udemy supports your professional development.'>
				All the skills you need in one place
			</SectionTitle>
			<ChooseCourse />
		</>
	)
}

export default PublicHomePage
