export const getCroppedImg = async (imageSrc: string, pixelCrop: any) => {
	const image = new Image()
	image.src = imageSrc
	await new Promise(resolve => (image.onload = resolve))

	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	canvas.width = pixelCrop.width
	canvas.height = pixelCrop.height

	ctx?.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	)

	return new Promise<string>(resolve => {
		canvas.toBlob(blob => {
			if (blob) {
				resolve(URL.createObjectURL(blob))
			}
		}, 'image/jpeg')
	})
}
