'use client'

/**
 * THESIS: A living family album, not a rigid portfolio grid.
 * OWN-WORLD: Real photography, warm paper, navy controls, pink category tabs, and an irregular salon-wall rhythm.
 * STORY: Visitors glimpse every side of My Little Paris, choose the thread that inspires them, then keep exploring.
 * FIRST VIEWPORT: A quiet filter row gives way immediately to an image-led, mixed-category mosaic.
 * FORM: Experience-mode masonry album; the precise brief fixed the staging, so no concept seed was required.
 */

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
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
	showSummary = true,
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
	showSummary?: boolean
	syncSelectionToUrl?: boolean
	variant?: 'default' | 'compact'
}) {
	const [activeCategory, setActiveCategory] = useState<GallerySelection>(initialCategory)

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

	const activeLabel =
		activeCategory === 'all'
			? dict['gallery.filter.all']
			: dict[CATEGORY_KEYS[activeCategory]]
	const summary = dict['gallery.summary']
		.replace('{count}', String(visiblePhotos.length))
		.replace('{category}', activeLabel)

	const selectCategory = (category: GallerySelection) => {
		setActiveCategory(category)
		if (!syncSelectionToUrl) return
		const url = new URL(window.location.href)
		if (category === 'all') url.searchParams.delete('category')
		else url.searchParams.set('category', category)
		window.history.pushState({}, '', url)
	}

	return (
		<div className="w-full">
			{(showFilters || showSummary) && (
				<div className="mb-7 flex flex-col gap-4 border-b border-primary/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
					{showFilters && (
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
					)}
					{showSummary && (
						<p className="shrink-0 font-display text-sm italic text-primary/70" aria-live="polite">
							{summary}
						</p>
					)}
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
					return (
						<figure
							key={photo.src}
							className={cn(
								'group relative mb-3 break-inside-avoid overflow-hidden rounded-box bg-base-300 md:mb-4',
								landscape ? 'aspect-[4/3]' : 'aspect-[4/5]',
							)}
						>
							<Image
								src={photo.src}
								alt={dict[photo.altKey as keyof Dictionary]}
								fill
								sizes={
									variant === 'compact'
										? '(max-width: 768px) 50vw, 25vw'
										: '(max-width: 768px) 50vw, 33vw'
								}
								className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
							/>
							<figcaption
								aria-hidden="true"
								className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent px-3 pb-3 pt-10 text-xs font-semibold text-white opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
							>
								{dict[CATEGORY_KEYS[photo.category]]}
							</figcaption>
						</figure>
					)
				})}
			</div>
		</div>
	)
}
