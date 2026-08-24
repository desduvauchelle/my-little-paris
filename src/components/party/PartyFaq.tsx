import Link from 'next/link'
import type { Dictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'

export function PartyFaq({ dict, locale }: { dict: Dictionary; locale: string }) {
	const items = [
		{
			question: dict['party.faq.cost.question'],
			answer: dict['party.faq.cost.answer'],
			href: '#party-packages',
			linkLabel: dict['party.faq.cost.link'],
		},
		{
			question: dict['party.faq.included.question'],
			answer: dict['party.faq.included.answer'],
			href: '#party-packages',
			linkLabel: dict['party.faq.included.link'],
		},
		{
			question: dict['party.faq.ages.question'],
			answer: dict['party.faq.ages.answer'],
			href: localizedPath('/play', locale),
			linkLabel: dict['party.faq.ages.link'],
		},
		{
			question: dict['party.faq.duration.question'],
			answer: dict['party.faq.duration.answer'],
			href: '#party-guidelines',
			linkLabel: dict['party.faq.duration.link'],
		},
		{
			question: dict['party.faq.booking.question'],
			answer: dict['party.faq.booking.answer'],
			href: '#party-inquiry',
			linkLabel: dict['party.faq.booking.link'],
		},
	]

	return (
		<section aria-labelledby="party-faq-heading" className="bg-base-100 py-16 sm:py-20">
			<div className="container mx-auto max-w-5xl px-4">
				<div className="mx-auto max-w-3xl text-center">
					<p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-base-content/65">
						{dict['party.faq.eyebrow']}
					</p>
					<h2 id="party-faq-heading" className="font-display text-4xl text-primary md:text-5xl">
						{dict['party.faq.heading']}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-base-content/70">{dict['party.faq.intro']}</p>
				</div>

				<dl className="mt-10 grid gap-4 md:grid-cols-2">
					{items.map((item, index) => (
						<div
							key={item.question}
							className={`rounded-box border border-base-300 bg-base-200 p-6 ${index === items.length - 1 ? 'md:col-span-2' : ''}`}
						>
							<dt className="text-lg font-bold leading-snug text-primary">{item.question}</dt>
							<dd className="mt-3 leading-relaxed text-base-content/80">
								{item.answer}{' '}
								<Link href={item.href} className="link link-primary font-semibold">
									{item.linkLabel}
								</Link>
							</dd>
						</div>
					))}
				</dl>

				<div className="mt-8 text-center">
					<a href="#party-packages" className="btn btn-primary">
						{dict['party.faq.cta']}
					</a>
				</div>
			</div>
		</section>
	)
}
