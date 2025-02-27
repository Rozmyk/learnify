const StatItem = ({ icon: Icon, value }: { icon: React.ElementType; value: string | number }) => (
	<div className='flex gap-4 text-muted-foreground'>
		<Icon size={16} />
		<p className='text-sm'>{value}</p>
	</div>
)

export default StatItem
