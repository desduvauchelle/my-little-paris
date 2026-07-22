import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { PartyInquiryForm } from '@/components/party/PartyInquiryForm'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/party-reservation',
		locale,
		title: dict['partyform.title'],
		description: dict['partyform.intro'],
	})
}

export default async function PartyReservationPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	return (
		<>
			<section className="navy-section py-16 text-center">
				<div className="container mx-auto px-4 max-w-2xl">
					<h1 className="font-display text-5xl text-white mb-4">{dict['partyform.title']}</h1>
					<p className="text-white/80 mb-6">{dict['partyform.intro']}</p>
					<Link href={localizedPath('/party', locale)} className="btn bg-white text-[#001d61] border-0 hover:bg-white/90">
						{dict['partyform.see.packages']}
					</Link>
				</div>
			</section>

			<section className="py-16 bg-base-100">
				<div className="container mx-auto px-4 max-w-2xl">
					<h2 className="font-display text-3xl text-primary text-center mb-10">{dict['partyform.heading']}</h2>
					<PartyInquiryForm dict={dict} />
				</div>
			</section>
		</>
	)
}
