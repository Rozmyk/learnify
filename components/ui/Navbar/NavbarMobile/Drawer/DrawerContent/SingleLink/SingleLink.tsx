import Link from 'next/link'
const SingleLink = ({ href, content }: { href: string; content: string }) => {
	return (
		<Link className='py-1 px-0.5 ' href={href}>
			{content}
		</Link>
	)
}

export default SingleLink
