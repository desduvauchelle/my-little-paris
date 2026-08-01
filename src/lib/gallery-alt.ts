import type { Dictionary, DictionaryKey } from '@/i18n'
import type { GalleryCategory, GalleryPhoto } from '@/data/gallery'

const CATEGORY_ALT_KEYS = {
	events: 'gallery.alt.events',
	buffet: 'gallery.alt.catering-spread',
	food: 'gallery.alt.food',
	'the-space': 'gallery.alt.space',
	moments: 'gallery.alt.moments',
} as const satisfies Record<GalleryCategory, DictionaryKey>

export function getGalleryPhotoAlt(dict: Dictionary, photo: GalleryPhoto): string {
	return (
		dict[photo.altKey as keyof Dictionary]
		|| dict[CATEGORY_ALT_KEYS[photo.category]]
		|| 'My Little Paris gallery photo'
	)
}
