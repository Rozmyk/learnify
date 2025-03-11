import ReactPlayer from 'react-player'
const VideoModal = () => {
	return (
		<div>
			<ReactPlayer
				url={'https://www.youtube.com/watch?v=enX8M-i8Joc'}
				playing={true}
				controls={true}
				width='100%'
				height='500px'
			/>
		</div>
	)
}

export default VideoModal
