const Badge = ({ text }: { text: string }) => {
	return <span className='bg-secondary text-primary px-1 py-2 rounded-lg text-xs'>{text}</span>
}
const StatusBadge = ({ status }: { status: string }) => {
	switch (status) {
		case 'draft':
			return <Badge text='Operating mode' />

		case 'published':
			return <Badge text='Published mode' />
		case 'archived':
			return <Badge text='Archived mode' />
	}
}

export default StatusBadge
