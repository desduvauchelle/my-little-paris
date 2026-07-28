export const GALLERY_CATEGORIES = ['events', 'food', 'the-space', 'moments'] as const

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]

const GALLERY_PHOTO_SLUGS = {
	events: [
		'pink-floral-first-birthday-table-san-gabriel',
		'families-princess-tea-party-my-little-paris',
		'race-car-first-birthday-balloon-backdrop',
		'race-car-birthday-table-checkered-decor',
		'koala-first-birthday-table-decor',
		'superhero-birthday-dessert-buffet',
		'children-princess-storytime-event',
		'child-hugging-cinderella-princess-event',
		'frozen-birthday-dessert-table',
		'blue-balloon-birthday-party-room',
		'pastel-birthday-party-room-setup',
		'blue-themed-birthday-party-favor-bags',
		'neutral-balloon-birthday-cake-table',
		'princess-birthday-table-pink-gold-decor',
		'green-white-botanical-party-table',
		'family-baby-shower-private-event',
		'pastel-balloon-arch-party-room',
		'pastel-candy-birthday-table',
		'pastel-balloon-party-room-tables',
		'silver-gold-balloon-party-table',
		'pink-happy-birthday-dessert-table',
		'green-gold-balloon-party-room',
		'woodland-themed-birthday-cake',
		'rainbow-balloon-first-birthday-backdrop',
		'pink-character-birthday-table-settings',
		'pink-floral-first-birthday-family-table',
		'frozen-princess-birthday-dessert-display',
		'hello-kitty-first-birthday-cake-display',
		'hello-kitty-birthday-table-place-settings',
		'pink-floral-first-birthday-table-closeup',
		'pastel-first-birthday-cake-closeup',
		'pink-birthday-party-favor-table',
		'rainbow-birthday-party-room-setup',
		'colorful-character-second-birthday-backdrop',
		'pink-first-birthday-place-settings',
		'blue-white-dessert-buffet-party',
		'easter-bunny-character-visit-kids',
		'pink-floral-birthday-place-settings',
		'peach-pink-first-birthday-favor-table',
		'dinosaur-birthday-party-table',
	],
	food: [
		'assorted-savory-party-catering-platter',
		'fresh-catering-buffet-spread',
		'party-catering-table-salads-sandwiches',
		'mini-sandwiches-party-catering',
		'fresh-fruit-platter-berries-pineapple',
		'kids-turkey-sandwich-fries-cafe',
		'prosciutto-salad-party-appetizers',
		'smoked-salmon-avocado-salad',
	],
	'the-space': [
		'bright-indoor-playground-wide-view',
		'montessori-inspired-cafe-play-space',
		'parent-afternoon-tea-beside-playground',
		'wooden-playhouse-indoor-play-area',
		'private-party-room-pink-table-setup',
		'cafe-sandwich-beside-indoor-playground',
	],
	moments: [
		'toddler-montessori-pretend-play',
		'children-colorful-parachute-group-play',
		'children-indoor-wooden-playground',
		'little-mermaid-princess-face-painting-event',
		'toddlers-wooden-playhouse-window',
	],
} as const

export type GalleryPhotoSlug =
	(typeof GALLERY_PHOTO_SLUGS)[keyof typeof GALLERY_PHOTO_SLUGS][number]

export type GalleryPhotoAltKey = `gallery.photo.${GalleryPhotoSlug}`

export type GalleryPhoto = {
	src: string
	category: GalleryCategory
	altKey: GalleryPhotoAltKey
}

function photos(
	category: GalleryCategory,
	slugs: readonly GalleryPhotoSlug[],
): GalleryPhoto[] {
	return slugs.map((slug) => ({
		src: `/gallery/processed/${category}/${slug}.jpg`,
		category,
		altKey: `gallery.photo.${slug}`,
	}))
}

export const GALLERY_PHOTOS: Record<GalleryCategory, GalleryPhoto[]> = {
	events: photos('events', GALLERY_PHOTO_SLUGS.events),
	food: photos('food', GALLERY_PHOTO_SLUGS.food),
	'the-space': photos('the-space', GALLERY_PHOTO_SLUGS['the-space']),
	moments: photos('moments', GALLERY_PHOTO_SLUGS.moments),
}
