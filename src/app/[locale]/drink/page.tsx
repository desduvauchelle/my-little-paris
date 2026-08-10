import type { Metadata } from 'next'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { DRINK_MENU } from '@/data/menu'
import { MenuJumpNav, MenuSections } from '@/components/menu/MenuSections'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/drink',
		locale,
		title: dict['drink.heading'],
		description: dict['drink.sub'],
	})
}

export default async function DrinkPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<>
			<BreadcrumbJsonLd
				path="/drink"
				locale={locale}
				homeName={dict['nav.home']}
				name={dict['drink.heading']}
				parent={{ name: dict['nav.menu'], path: '/menu' }}
			/>
			<section className="navy-section py-16 text-center">
				<h1 className="font-display text-5xl text-white mb-3">{dict['drink.heading']}</h1>
				<p className="text-white/75">{dict['drink.sub']}</p>
			</section>

			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<MenuJumpNav
						label={dict['eat.jump']}
						links={[
							{ href: localizedPath('/eat', locale), label: dict['menu.heading'] },
							{ href: localizedPath('/kidsmenu', locale), label: dict['eat.kids.link'] },
							{ href: localizedPath('/drink', locale), label: dict['eat.drinks.link'], active: true },
							{ href: `${localizedPath('/eat', locale)}#desserts`, label: dict['eat.desserts.link'] },
						]}
					/>
					<MenuSections sections={DRINK_MENU} dict={dict} />
				</div>
			</section>
		</>
	)
}
