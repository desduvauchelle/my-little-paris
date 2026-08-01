import { describe, expect, it } from 'vitest'
import type { Dictionary } from '@/i18n'
import type { GalleryPhoto } from '@/data/gallery'
import { getGalleryPhotoAlt } from './gallery-alt'

const photo: GalleryPhoto = {
	src: '/gallery/processed/food/tomato-bruschetta-mixed-greens-cafe.jpg',
	category: 'food',
	altKey: 'gallery.photo.tomato-bruschetta-mixed-greens-cafe',
}

describe('getGalleryPhotoAlt', () => {
	it('uses the image-specific translated alt text when available', () => {
		const dict = {
			[photo.altKey]: 'Tomato bruschetta beside the playground',
			'gallery.alt.food': 'Food at My Little Paris',
		} as Dictionary

		expect(getGalleryPhotoAlt(dict, photo)).toBe('Tomato bruschetta beside the playground')
	})

	it('falls back to translated category text when a runtime dictionary is stale', () => {
		const staleDict = {
			'gallery.alt.food': 'Food at My Little Paris',
		} as Dictionary

		expect(getGalleryPhotoAlt(staleDict, photo)).toBe('Food at My Little Paris')
	})
})
