import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { ScrollReveal } from '@/components/landing/ScrollReveal'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { DRINK_MENU, EAT_MENU, KIDS_MENU } from '@/data/menu'
import { ADMISSION } from '@/data/play'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/menu',
		locale,
		title: dict['menu.meta.title'],
		description: dict['menu.meta.description'],
		brand: false,
	})
}

export default async function MenuPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	// One source of truth per menu: the tile, the blurb and the section list all
	// come from the same entry, so the hub can never drift from the real menus.
	const MENUS = [
		{
			href: '/eat',
			label: dict['menu.eat'],
			description: dict['menu.eat.desc'],
			image: '/images/eat-menu-tile.webp',
			sections: EAT_MENU,
		},
		{
			href: '/drink',
			label: dict['menu.drink'],
			description: dict['menu.drink.desc'],
			image: '/images/drink-menu-tile.webp',
			sections: DRINK_MENU,
		},
		{
			href: '/kidsmenu',
			label: dict['menu.kids'],
			description: dict['menu.kids.desc'],
			image: '/images/pesto-sandwich.webp',
			sections: KIDS_MENU,
		},
	]

	const GOOD_TO_KNOW = [
		{
			title: dict['menu.know.session.title'],
			body: dict['menu.know.session.body']
				.replace('{child}', ADMISSION.child)
				.replace('{sibling}', ADMISSION.sibling),
		},
		{ title: dict['menu.know.adults.title'], body: dict['menu.know.adults.body'] },
		{ title: dict['menu.know.happyhour.title'], body: dict['menu.know.happyhour.body'] },
		{ title: dict['menu.know.kids.title'], body: dict['menu.know.kids.body'] },
		{ title: dict['menu.know.dietary.title'], body: dict['menu.know.dietary.body'] },
		{ title: dict['menu.know.reserve.title'], body: dict['menu.know.reserve.body'] },
	]

	return (
		<>
			<BreadcrumbJsonLd path="/menu" locale={locale} homeName={dict['nav.home']} name={dict['nav.menu']} />
			<section className="navy-section py-16 text-center">
				<h1 className="font-display text-5xl text-white mb-3">{dict['menu.heading']}</h1>
				<p className="text-white/75">{dict['menu.sub']}</p>
			</section>

			<section className="bg-base-100 pt-16">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-3xl space-y-4 text-center text-base-content/80">
						<p className="text-lg leading-relaxed">{dict['menu.intro.p1']}</p>
						<p className="leading-relaxed">{dict['menu.intro.p2']}</p>
					</div>
				</div>
			</section>

			<section className="py-14 bg-base-100">
				<div className="container mx-auto px-4">
					<ScrollReveal y={40} stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						{MENUS.map((menu) => (
							<Link
								key={menu.href}
								href={localizedPath(menu.href, locale)}
								className="card bg-base-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group"
							>
								<figure className="relative h-64">
									<Image
										src={menu.image}
										alt={menu.label}
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</figure>
								<div className="card-body items-center py-5 text-center">
									<h2 className="card-title font-display text-2xl text-primary">{menu.label}</h2>
									<p className="text-sm text-base-content/70">{menu.description}</p>
								</div>
							</Link>
						))}
					</ScrollReveal>
				</div>
			</section>

			{/* What's on each menu — section names come straight from the menu data. */}
			<section className="py-16 bg-base-200">
				<div className="container mx-auto px-4">
					<div className="mx-auto mb-10 max-w-2xl text-center">
						<h2 className="font-display text-4xl text-primary">{dict['menu.sections.heading']}</h2>
						<p className="mt-3 text-base-content/70">{dict['menu.sections.sub']}</p>
					</div>
					<ScrollReveal y={30} stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
						{MENUS.map((menu) => (
							<div key={menu.href} className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<h3 className="font-display text-2xl text-primary">{menu.label}</h3>
									<ul className="mt-2 space-y-1.5 text-sm text-base-content/75">
										{menu.sections.map((section) => (
											<li key={section.id} className="flex gap-2">
												<span aria-hidden className="text-secondary">·</span>
												<span>{section.title}</span>
											</li>
										))}
									</ul>
									<Link
										href={localizedPath(menu.href, locale)}
										className="link link-primary mt-4 text-sm font-medium"
									>
										{dict['menu.sections.view'].replace('{menu}', menu.label)} →
									</Link>
								</div>
							</div>
						))}
					</ScrollReveal>
				</div>
			</section>

			{/* Good to know — the questions people call and ask before booking. */}
			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<h2 className="font-display text-4xl text-primary text-center mb-10">{dict['menu.know.heading']}</h2>
					<ScrollReveal y={30} stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						{GOOD_TO_KNOW.map((item) => (
							<div key={item.title} className="rounded-box border border-base-300 bg-base-200/50 p-6">
								<h3 className="font-semibold text-primary mb-2">{item.title}</h3>
								<p className="text-sm leading-relaxed text-base-content/75">{item.body}</p>
							</div>
						))}
					</ScrollReveal>

					<div className="mt-10 flex flex-wrap justify-center gap-3">
						<Link href={localizedPath('/reservations', locale)} className="btn btn-primary">
							{dict['menu.know.cta.reserve']}
						</Link>
						<Link href={localizedPath('/play', locale)} className="btn btn-outline btn-primary">
							{dict['menu.know.cta.play']}
						</Link>
					</div>

					<p className="text-center font-display italic text-2xl text-base-content/70 mt-14">
						{dict['menu.tagline']}
					</p>
				</div>
			</section>
		</>
	)
}
