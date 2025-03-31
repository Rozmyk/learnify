export const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<Blob> => {
	return new Promise(async (resolve, reject) => {
		const image = new Image()
		image.src = imageSrc

		await new Promise(resolve => (image.onload = resolve))

		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')

		if (!ctx) {
			reject(new Error('Canvas context is null'))
			return
		}

		canvas.width = pixelCrop.width
		canvas.height = pixelCrop.height

		ctx.drawImage(
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

		canvas.toBlob(blob => {
			if (blob) {
				resolve(blob)
			} else {
				reject(new Error('Cropping failed: Blob is null'))
			}
		}, 'image/jpeg')
	})
}
