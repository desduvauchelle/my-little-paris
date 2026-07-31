'use client'

/**
 * THESIS: A living family album, not a rigid portfolio grid.
 * OWN-WORLD: Real photography, warm paper, navy controls, pink category tabs, and an irregular salon-wall rhythm.
 * STORY: Visitors glimpse every side of My Little Paris, choose the thread that inspires them, then keep exploring.
 * FIRST VIEWPORT: A quiet filter row gives way immediately to an image-led, mixed-category mosaic.
 * FORM: Experience-mode masonry album; the precise brief fixed the staging, so no concept seed was required.
 */

import Image from 'next/image'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react'
import type { Dictionary } from '@/i18n'
import {
	GALLERY_CATEGORIES,
	GALLERY_PHOTOS,
	type GalleryCategory,
	type GalleryPhoto,
} from '@/data/gallery'
import { cn } from '@/lib/utils'

export type GallerySelection = GalleryCategory | 'all'

const CATEGORY_KEYS = {
	events: 'gallery.filter.events',
	buffet: 'gallery.filter.buffet',
	food: 'gallery.filter.food',
	'the-space': 'gallery.filter.space',
	moments: 'gallery.filter.moments',
} as const satisfies Record<GalleryCategory, keyof Dictionary>

function seededRandom(seed: number) {
	let value = seed || 1
	return () => {
		value |= 0
		value = (value + 0x6d2b79f5) | 0
		let mixed = Math.imul(value ^ (value >>> 15), 1 | value)
		mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed
		return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296
	}
}

function sample(items: GalleryPhoto[], count: number, random: () => number) {
	const copy = [...items]
	for (let index = copy.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(random() * (index + 1))
		;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
	}
	return copy.slice(0, count)
}

function mixedOverview(seed: number, perCategory: number) {
	const random = seededRandom(seed)
	const sampled = GALLERY_CATEGORIES.map((category) =>
		sample(GALLERY_PHOTOS[category], perCategory, random),
	)
	return Array.from({ length: perCategory }, (_, imageIndex) =>
		sampled.map((categoryPhotos) => categoryPhotos[imageIndex]),
	).flat()
}

export function PhotoGallery({
	dict,
	initialCategory = 'all',
	seed = 1,
	mixedCountPerCategory = 2,
	filteredLimit,
	shuffleFiltered = false,
	showFilters = true,
	syncSelectionToUrl = false,
	variant = 'default',
}: {
	dict: Dictionary
	initialCategory?: GallerySelection
	seed?: number
	mixedCountPerCategory?: number
	filteredLimit?: number
	shuffleFiltered?: boolean
	showFilters?: boolean
	syncSelectionToUrl?: boolean
	variant?: 'default' | 'compact'
}) {
	const [activeCategory, setActiveCategory] = useState<GallerySelection>(initialCategory)
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
	const [lightboxOrigin, setLightboxOrigin] = useState({ x: '50vw', y: '50vh' })
	const dialogRef = useRef<HTMLDialogElement>(null)
	const lightboxTitleId = useId()
	const lightboxDescriptionId = useId()

	useEffect(() => {
		setActiveCategory(initialCategory)
	}, [initialCategory])

	useEffect(() => {
		if (!syncSelectionToUrl) return
		const handleHistoryChange = () => {
			const category = new URL(window.location.href).searchParams.get('category')
			setActiveCategory(
				GALLERY_CATEGORIES.includes(category as GalleryCategory)
					? (category as GalleryCategory)
					: 'all',
			)
		}
		window.addEventListener('popstate', handleHistoryChange)
		return () => window.removeEventListener('popstate', handleHistoryChange)
	}, [syncSelectionToUrl])
	const overview = useMemo(
		() => mixedOverview(seed, mixedCountPerCategory),
		[seed, mixedCountPerCategory],
	)

	const visiblePhotos = useMemo(() => {
		if (activeCategory === 'all') return overview
		const categoryPhotos = shuffleFiltered
			? sample(GALLERY_PHOTOS[activeCategory], GALLERY_PHOTOS[activeCategory].length, seededRandom(seed))
			: GALLERY_PHOTOS[activeCategory]
		return filteredLimit ? categoryPhotos.slice(0, filteredLimit) : categoryPhotos
	}, [activeCategory, filteredLimit, overview, seed, shuffleFiltered])

	const lightboxPhoto = lightboxIndex === null ? null : visiblePhotos[lightboxIndex]
	const lightboxAlt = lightboxPhoto
		? dict[lightboxPhoto.altKey as keyof Dictionary]
		: ''

	const selectCategory = (category: GallerySelection) => {
		setActiveCategory(category)
		if (!syncSelectionToUrl) return
		const url = new URL(window.location.href)
		if (category === 'all') url.searchParams.delete('category')
		else url.searchParams.set('category', category)
		window.history.pushState({}, '', url)
	}

	const openLightbox = (index: number, event: ReactMouseEvent<HTMLButtonElement>) => {
		const bounds = event.currentTarget.getBoundingClientRect()
		setLightboxOrigin({
			x: `${bounds.left + bounds.width / 2}px`,
			y: `${bounds.top + bounds.height / 2}px`,
		})
		setLightboxIndex(index)
	}

	const closeLightbox = () => dialogRef.current?.close()

	const moveLightbox = (direction: -1 | 1) => {
		setLightboxIndex((currentIndex) => {
			if (currentIndex === null) return null
			return (currentIndex + direction + visiblePhotos.length) % visiblePhotos.length
		})
	}

	useEffect(() => {
		if (lightboxIndex !== null && !dialogRef.current?.open) {
			dialogRef.current?.showModal()
		}
	}, [lightboxIndex])

	return (
		<div className="w-full">
			{showFilters && (
				<div className="mb-7 flex flex-col gap-4 border-b border-primary/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
					<div
						className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
						aria-label={dict['gallery.filter.label']}
					>
						{(['all', ...GALLERY_CATEGORIES] as GallerySelection[]).map((category) => {
							const isActive = activeCategory === category
							const label = category === 'all' ? dict['gallery.filter.all'] : dict[CATEGORY_KEYS[category]]
							return (
								<button
									key={category}
									type="button"
									aria-pressed={isActive}
									onClick={() => selectCategory(category)}
									className={cn(
										'focus-visible:outline-primary shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
										isActive
											? 'border-primary bg-primary text-primary-content'
											: 'border-primary/20 bg-base-100 text-primary hover:border-secondary hover:bg-secondary/10',
									)}
								>
									{label}
								</button>
							)
						})}
					</div>
				</div>
			)}

			<div
				key={activeCategory}
				className={cn(
					'gallery-recompose',
					variant === 'compact'
						? 'columns-2 gap-3 md:columns-4'
						: 'columns-2 gap-3 md:columns-3 md:gap-4',
				)}
				aria-label={dict['gallery.aria']}
			>
				{visiblePhotos.map((photo, index) => {
					const landscape = index % 5 === 0 || index % 7 === 0
					const alt = dict[photo.altKey as keyof Dictionary]
					return (
						<figure
							key={photo.src}
							className={cn(
								'group relative mb-3 break-inside-avoid overflow-hidden rounded-box bg-base-300 md:mb-4',
								landscape ? 'aspect-[4/3]' : 'aspect-[4/5]',
							)}
						>
							<button
								type="button"
								onClick={(event) => openLightbox(index, event)}
								aria-label={dict['gallery.lightbox.open'].replace('{description}', alt)}
								className="absolute inset-0 cursor-zoom-in overflow-hidden rounded-box focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
							>
								<Image
									src={photo.src}
									alt={alt}
									fill
									loading={index === 0 ? 'eager' : 'lazy'}
									sizes={
										variant === 'compact'
											? '(max-width: 768px) 50vw, 25vw'
											: '(max-width: 768px) 50vw, 33vw'
									}
									className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
								/>
							</button>
							<figcaption
								aria-hidden="true"
								className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 via-primary/45 to-transparent px-3 pb-3 pt-12 text-xs font-medium leading-snug text-white opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
							>
								{alt}
							</figcaption>
						</figure>
					)
				})}
			</div>

			<dialog
				ref={dialogRef}
				onClose={() => setLightboxIndex(null)}
				onCancel={(event) => {
					event.preventDefault()
					closeLightbox()
				}}
				onKeyDown={(event) => {
					if (event.key === 'Escape') {
						event.preventDefault()
						closeLightbox()
					}
					if (event.key === 'ArrowLeft') moveLightbox(-1)
					if (event.key === 'ArrowRight') moveLightbox(1)
				}}
				aria-modal="true"
				aria-labelledby={lightboxTitleId}
				aria-describedby={lightboxDescriptionId}
				className="gallery-lightbox"
			>
				{lightboxPhoto && lightboxIndex !== null && (
					<div
						className="gallery-lightbox-balloon"
						style={{
							'--lightbox-origin-x': lightboxOrigin.x,
							'--lightbox-origin-y': lightboxOrigin.y,
						} as CSSProperties}
						onClick={(event) => {
							if (event.target === event.currentTarget) closeLightbox()
						}}
					>
						<h2 id={lightboxTitleId} className="sr-only">
							{dict['gallery.lightbox.label']}
						</h2>

						<button
							type="button"
							onClick={closeLightbox}
							autoFocus
							aria-label={dict['gallery.lightbox.close']}
							className="gallery-lightbox-control absolute end-4 top-4 z-20 sm:end-6 sm:top-6"
						>
							<span aria-hidden="true">×</span>
						</button>

						<button
							type="button"
							onClick={() => moveLightbox(-1)}
							aria-label={dict['gallery.lightbox.previous']}
							className="gallery-lightbox-control absolute start-3 top-1/2 z-20 -translate-y-1/2 sm:start-6"
						>
							<span aria-hidden="true">‹</span>
						</button>

						<figure className="relative h-full w-full overflow-hidden">
							<Image
								key={lightboxPhoto.src}
								src={lightboxPhoto.src}
								alt={lightboxAlt}
								fill
								sizes="100vw"
								className="gallery-lightbox-image object-contain p-3 pb-24 sm:p-6 sm:pb-28"
							/>
							<figcaption
								id={lightboxDescriptionId}
								aria-live="polite"
								className="absolute inset-x-0 bottom-0 bg-primary/80 px-4 py-3 text-center text-sm text-white backdrop-blur-sm sm:px-6"
							>
								<span className="block font-medium">{lightboxAlt}</span>
								<span className="mt-1 block text-xs text-white/70">
									{dict['gallery.lightbox.count']
										.replace('{current}', String(lightboxIndex + 1))
										.replace('{total}', String(visiblePhotos.length))}
								</span>
							</figcaption>
						</figure>

						<button
							type="button"
							onClick={() => moveLightbox(1)}
							aria-label={dict['gallery.lightbox.next']}
							className="gallery-lightbox-control absolute end-3 top-1/2 z-20 -translate-y-1/2 sm:end-6"
						>
							<span aria-hidden="true">›</span>
						</button>
					</div>
				)}
			</dialog>
		</div>
	)
}
