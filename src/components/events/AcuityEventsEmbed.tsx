'use client'

import { useEffect, useRef, useState } from 'react'

const MIN_EMBED_HEIGHT = 700

export function AcuityEventsEmbed({ src, title }: { src: string; title: string }) {
	const frameRef = useRef<HTMLIFrameElement>(null)
	const [height, setHeight] = useState(MIN_EMBED_HEIGHT)

	useEffect(() => {
		function handleMessage(event: MessageEvent) {
			const frame = frameRef.current
			if (!frame || event.source !== frame.contentWindow || typeof event.data !== 'string') return

			const [messageType, rawHeight] = event.data.split(':')
			const nextHeight = Number.parseInt(rawHeight, 10)

			if (messageType === 'sizing' && Number.isFinite(nextHeight) && nextHeight > 150) {
				setHeight(nextHeight)
			}
		}

		window.addEventListener('message', handleMessage)
		return () => window.removeEventListener('message', handleMessage)
	}, [])

	return (
		<iframe
			ref={frameRef}
			src={src}
			title={title}
			width="100%"
			height={height}
			frameBorder="0"
			allow="payment"
			className="block w-full bg-white"
			style={{ height }}
		/>
	)
}
