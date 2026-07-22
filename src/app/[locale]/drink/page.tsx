import type { Metadata } from 'next'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { DRINK_MENU } from '@/data/menu'
import { MenuJumpNav, MenuSections } from '@/components/menu/MenuSections'

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
			<section className="navy-section py-16 text-center">
				<h1 className="font-display text-5xl text-white mb-3">{dict['drink.heading']}</h1>
				<p className="text-white/75">{dict['drink.sub']}</p>
			</section>

			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<MenuJumpNav
						label={dict['eat.jump']}
						sections={DRINK_MENU}
						extraLinks={[
							{ href: localizedPath('/eat', locale), label: dict['kids.main.link'] },
							{ href: localizedPath('/kidsmenu', locale), label: dict['eat.kids.link'] },
						]}
					/>
					<MenuSections sections={DRINK_MENU} dict={dict} />
				</div>
			</section>
		</>
	)
}
