import Link from 'next/link'
const SingleLink = ({ href, content }: { href: string; content: string }) => {
	return <Link href={href}>{content}</Link>
}

export default SingleLink
