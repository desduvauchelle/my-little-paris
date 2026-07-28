import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { localizedPath } from '@/lib/i18n-utils'
import { GALLERY_CATEGORIES, GALLERY_PHOTOS, type GalleryCategory } from '@/data/gallery'
import { PhotoGallery, type GallerySelection } from '@/components/gallery/PhotoGallery'

export const revalidate = 86400

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const featuredPhoto = GALLERY_PHOTOS.events[0]
	return buildPageMetadata({
		path: '/gallery',
		locale,
		title: dict['gallery.meta.title'],
		description: dict['gallery.meta.description'],
		image: featuredPhoto.src,
		imageAlt: dict[featuredPhoto.altKey as keyof typeof dict],
	})
}

function initialSelection(value: string | string[] | undefined): GallerySelection {
	const category = Array.isArray(value) ? value[0] : value
	return GALLERY_CATEGORIES.includes(category as GalleryCategory)
		? (category as GalleryCategory)
		: 'all'
}

export default async function GalleryPage({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>
	searchParams: Promise<{ category?: string | string[] }>
}) {
	const [{ locale }, query] = await Promise.all([params, searchParams])
	const dict = await getDictionary(locale)
	const category = initialSelection(query.category)
	const gallerySeed = new Date().getUTCDate() + locale.length * 67

	return (
		<>
			<section className="navy-section overflow-hidden py-14 sm:py-20">
				<div className="container mx-auto max-w-5xl px-4 text-center">
					<p className="mb-4 text-sm font-semibold text-secondary">{dict['gallery.kicker']}</p>
					<h1 className="font-display text-5xl text-white sm:text-6xl lg:text-7xl">{dict['gallery.title']}</h1>
					<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
						{dict['gallery.intro']}
					</p>
				</div>
			</section>

			<section className="bg-base-100 py-10 sm:py-14">
				<div className="container mx-auto max-w-7xl px-4">
					<PhotoGallery
						dict={dict}
						initialCategory={category}
						seed={gallerySeed}
						mixedCountPerCategory={3}
						syncSelectionToUrl
					/>
				</div>
			</section>

			<section className="navy-section py-14 sm:py-16">
				<div className="container mx-auto flex max-w-4xl flex-col items-center gap-7 px-4 text-center">
					<h2 className="max-w-2xl font-display text-3xl text-white sm:text-4xl">
						{dict['gallery.cta.heading']}
					</h2>
					<div className="flex flex-wrap justify-center gap-3">
						<Link href={localizedPath('/reservations', locale)} className="btn bg-white text-primary hover:bg-base-200">
							{dict['gallery.cta.play']}
						</Link>
						<Link href={localizedPath('/party', locale)} className="btn border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10">
							{dict['gallery.cta.party']}
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
