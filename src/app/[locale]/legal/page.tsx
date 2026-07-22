import type { Metadata } from 'next'
import { getDictionary } from '@/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { getLegalDoc } from '@/content/legal'
import { LegalDocument } from '@/components/legal/LegalDocument'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/legal',
		locale,
		title: dict['page.terms.of.service'],
		description: getLegalDoc(locale, 'terms').summary,
	})
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return <LegalDocument locale={locale} doc="terms" title={dict['page.terms.of.service']} />
}
