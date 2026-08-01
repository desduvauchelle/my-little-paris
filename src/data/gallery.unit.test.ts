import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import en from '@/i18n/dictionaries/en'
import fr from '@/i18n/dictionaries/fr'
import zh from '@/i18n/dictionaries/zh'
import { GALLERY_CATEGORIES, GALLERY_PHOTOS } from './gallery'

const dictionaries = { en, fr, zh }
const minimumAltLengths = { en: 24, fr: 24, zh: 12 }
const allPhotos = GALLERY_CATEGORIES.flatMap((category) => GALLERY_PHOTOS[category])

describe('gallery SEO metadata', () => {
	it('separates birthday buffet photos from individual dishes', () => {
		expect(GALLERY_PHOTOS.buffet).toHaveLength(17)
		expect(GALLERY_PHOTOS.food).toHaveLength(12)
		expect(GALLERY_PHOTOS.buffet.every((photo) => photo.category === 'buffet')).toBe(true)
		expect(GALLERY_PHOTOS.food.every((photo) => photo.category === 'food')).toBe(true)
		expect(GALLERY_PHOTOS.buffet.map((photo) => photo.altKey)).toEqual(expect.arrayContaining([
			'gallery.photo.prosciutto-salad-party-appetizers',
			'gallery.photo.croque-monsieur-party-bites-platter',
			'gallery.photo.birthday-toasted-sandwiches-party-platter',
			'gallery.photo.smoked-salmon-canapes-hello-kitty-party',
			'gallery.photo.pizza-sliders-fries-party-buffet',
			'gallery.photo.smoked-salmon-crostini-party-platter-closeup',
		]))
		expect(GALLERY_PHOTOS.food).toContainEqual({
			src: '/gallery/processed/the-space/cafe-sandwich-beside-indoor-playground.jpg',
			category: 'food',
			altKey: 'gallery.photo.cafe-sandwich-beside-indoor-playground',
		})
		expect(GALLERY_PHOTOS.moments).toContainEqual({
			src: '/gallery/processed/the-space/parent-afternoon-tea-beside-playground.jpg',
			category: 'moments',
			altKey: 'gallery.photo.parent-afternoon-tea-beside-playground',
		})
	})

	it('keeps every gallery photo in the manifest with a descriptive filename', () => {
		expect(allPhotos).toHaveLength(99)
		expect(new Set(allPhotos.map((photo) => photo.src)).size).toBe(allPhotos.length)

		for (const photo of allPhotos) {
			const filename = photo.src.split('/').at(-1) ?? ''
			expect(filename).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)+\.jpg$/)
			expect(filename).not.toMatch(/^(?:img|dsc|image)[-_]?\d/i)
			expect(existsSync(join(process.cwd(), 'public', photo.src.replace(/^\//, '')))).toBe(true)
		}
	})

	it('provides image-specific alt text in every supported language', () => {
		for (const [locale, dictionary] of Object.entries(dictionaries)) {
			const altTexts = allPhotos.map((photo) => dictionary[photo.altKey])
			for (const altText of altTexts) {
				expect(altText, `${locale} gallery alt text`).toBeTruthy()
				expect(altText.length).toBeGreaterThan(minimumAltLengths[locale as keyof typeof minimumAltLengths])
			}
			expect(new Set(altTexts).size).toBe(allPhotos.length)
		}
	})
})
