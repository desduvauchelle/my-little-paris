import type { Metadata } from 'next'
import Link from 'next/link'
import { getFormBySlug, getBusinessConfig } from '@growth-engine/sdk-server'
import { getDictionary } from '@/i18n'
import { BUSINESS, LINKS } from '@/data/site'
import { localizedPath } from '@/lib/i18n-utils'
import { getDb, safeQuery } from '@/lib/db'
import { buildPageMetadata } from '@/lib/seo'
import { ConfigDisplay } from '@/components/config/ConfigDisplay'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactAnalytics } from './ContactAnalytics'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const CONTACT_FORM_SLUG = 'contact-form'

export const revalidate = 120

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/contact',
		locale,
		title: dict['contact.heading'],
		description: dict['contact.meta.description'],
	})
}

export default async function ContactPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)

	const [form, config] = await Promise.all([
		safeQuery(null, () => getFormBySlug(getDb(), CONTACT_FORM_SLUG)),
		safeQuery(null, () => getBusinessConfig(getDb())),
	])

	return (
		<div className="container mx-auto px-4 py-12">
			<BreadcrumbJsonLd path="/contact" locale={locale} homeName={dict['nav.home']} name={dict['nav.contact']} />
			<ContactAnalytics />

			<h1 className="text-4xl font-bold text-center mb-2">{dict['contact.heading']}</h1>
			<p className="text-center text-base-content/70 mb-10">
				{dict['contact.subtitle']}
			</p>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
				{/* Contact Form */}
				<div>
					{form ? <ContactForm form={form} dict={dict} /> : null}
				</div>

				{/* Visit details. Rendered from BUSINESS rather than the Brain config so
				    the page always carries the address, phone and email — the answers
				    people actually come to /contact for — even when the config query
				    comes back empty. */}
				<div className="space-y-8">
					<div>
						<h2 className="text-2xl font-semibold mb-3">{dict['contact.reach.heading']}</h2>
						<p className="text-base-content/75 leading-relaxed">{dict['contact.reach.body']}</p>
					</div>

					<div>
						<h2 className="text-2xl font-semibold mb-3">{dict['contact.visit.heading']}</h2>
						<p className="text-base-content/75 leading-relaxed mb-5">{dict['contact.visit.body']}</p>
						<dl className="space-y-4 text-sm">
							<div>
								<dt className="font-semibold text-primary">{dict['contact.visit.address']}</dt>
								<dd className="text-base-content/75">
									{BUSINESS.address.street}
									<br />
									{BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
									<br />
									<a href={LINKS.directions} target="_blank" rel="noopener noreferrer" className="link link-primary">
										{dict['contact.visit.directions']}
									</a>
								</dd>
							</div>
							<div>
								<dt className="font-semibold text-primary">{dict['contact.visit.phone']}</dt>
								<dd className="text-base-content/75">
									<a href={BUSINESS.phoneHref} className="link">{BUSINESS.phoneDisplay}</a>
								</dd>
							</div>
							<div>
								<dt className="font-semibold text-primary">{dict['contact.visit.email']}</dt>
								<dd className="text-base-content/75">
									<a href={`mailto:${BUSINESS.email}`} className="link">{BUSINESS.email}</a>
								</dd>
							</div>
							<div>
								<dt className="font-semibold text-primary">{dict['contact.visit.hours']}</dt>
								<dd className="text-base-content/75">
									{dict['footer.hours.body']}{' '}
									<a href={LINKS.hoursGoogle} target="_blank" rel="noopener noreferrer" className="link link-primary">
										{dict['footer.hours.google']}
									</a>
								</dd>
							</div>
						</dl>
						<p className="mt-4 text-sm text-base-content/70">{dict['contact.visit.languages']}</p>
					</div>

					{/* Live business config, when the Brain backend has it. */}
					{config && (
						<ConfigDisplay
							hours={config.hours ?? null}
							contact={config.contact ?? null}
							dict={dict}
						/>
					)}
				</div>
			</div>

			{/* Party enquiries belong on /party, not in the general contact form. */}
			<div className="max-w-5xl mx-auto mt-14">
				<div className="card bg-secondary/15 border border-secondary/30">
					<div className="card-body gap-4 lg:flex-row lg:items-center">
						<p className="flex-1 text-base-content/80">{dict['contact.reach.party']}</p>
						<Link href={localizedPath('/party', locale)} className="btn btn-primary shrink-0">
							{dict['contact.reach.party.cta']}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
