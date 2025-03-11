import ReactPlayer from 'react-player'
const VideoModal = ({ content }: { content: string }) => {
	return (
		<div>
			<ReactPlayer url={content} playing={true} controls={true} width='100%' height='500px' />
		</div>
	)
}

export default VideoModal
