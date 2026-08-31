'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { GALLERY_PHOTOS } from '@/data/gallery'
import type { Dictionary } from '@/i18n'
import { cn } from '@/lib/utils'

const CURATED_EVENT_INDICES = [0, 2, 6, 8, 14, 20, 23, 26, 28, 39]
const EVENT_PHOTOS = CURATED_EVENT_INDICES.map((index) => GALLERY_PHOTOS.events[index])

export function EventPhotoMarquee({ dict }: { dict: Dictionary }) {
	const marqueeRef = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(true)
	const [isDocumentVisible, setIsDocumentVisible] = useState(true)
	const motionHintId = useId()

	useEffect(() => {
		const marquee = marqueeRef.current
		if (!marquee) return
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.05 },
		)
		observer.observe(marquee)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const handleVisibilityChange = () => setIsDocumentVisible(!document.hidden)
		document.addEventListener('visibilitychange', handleVisibilityChange)
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
	}, [])

	const isPaused = !isVisible || !isDocumentVisible

	return (
		<div
			ref={marqueeRef}
			className="party-event-marquee relative mt-10"
			role="region"
			aria-label={dict['party.gallery.kicker']}
		>
			<p id={motionHintId} className="sr-only">
				{dict['party.gallery.motionHint']}
			</p>

			<a
				href="#party-gallery"
				aria-label={dict['party.gallery.jump']}
				aria-describedby={motionHintId}
				className="block cursor-pointer overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
			>
				<div className={cn('party-event-marquee-track', isPaused && 'is-paused')}>
					{[false, true].map((duplicate) => (
						/* The second copy is what makes the marquee loop seamlessly. It is
						   `aria-hidden`, so assistive tech never announces it twice — the
						   photos still carry their real alt text so that crawlers (and
						   Google Images) see every image described. */
						<ul
							key={String(duplicate)}
							className="party-event-marquee-copy"
							aria-hidden={duplicate || undefined}
						>
							{EVENT_PHOTOS.map((photo, index) => {
								const alt = dict[photo.altKey as keyof Dictionary]
								return (
									<li key={photo.src} className="shrink-0">
										<figure className="relative h-28 w-36 overflow-hidden rounded-box border border-white/15 bg-primary shadow-[0_10px_24px_-16px_rgba(0,0,0,0.8)] sm:h-32 sm:w-44">
											<Image
												src={photo.src}
												alt={alt}
												fill
												loading={!duplicate && index < 4 ? 'eager' : 'lazy'}
												sizes="(max-width: 640px) 144px, 176px"
												className="object-cover"
											/>
										</figure>
									</li>
								)
							})}
						</ul>
					))}
				</div>
			</a>
		</div>
	)
}
