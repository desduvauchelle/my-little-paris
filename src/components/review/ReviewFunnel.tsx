'use client'

import { useState } from 'react'
import { FormRenderer, type FormRendererProps } from '@growth-engine/sdk-client/components'
import type { Dictionary } from '@/i18n'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import { BUSINESS, LINKS } from '@/data/site'

type Form = FormRendererProps['form']

type Step = 'ask' | 'good' | 'bad' | 'sent'

export function ReviewFunnel({ dict, form }: { dict: Dictionary; form: Form | null }) {
	const [step, setStep] = useState<Step>('ask')

	const choose = (next: 'good' | 'bad') => {
		trackEvent('review_funnel_choice', { sentiment: next })
		setStep(next)
	}

	if (step === 'ask') {
		return (
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl sm:text-4xl font-bold text-center">{dict['review.heading']}</h1>
				<p className="text-center text-base-content/70 mb-4">{dict['review.subtitle']}</p>
				<button
					type="button"
					onClick={() => choose('good')}
					className="btn btn-primary btn-lg h-auto min-h-20 w-full text-lg flex-col gap-1 py-4"
				>
					<span className="text-4xl" aria-hidden="true">😍</span>
					{dict['review.choice.good']}
				</button>
				<button
					type="button"
					onClick={() => choose('bad')}
					className="btn btn-outline btn-lg h-auto min-h-20 w-full text-lg flex-col gap-1 py-4"
				>
					<span className="text-4xl" aria-hidden="true">😕</span>
					{dict['review.choice.bad']}
				</button>
			</div>
		)
	}

	if (step === 'good') {
		return (
			<div className="flex flex-col gap-4 text-center">
				<span className="text-6xl" aria-hidden="true">🥐</span>
				<h1 className="text-3xl sm:text-4xl font-bold">{dict['review.good.heading']}</h1>
				<p className="text-base-content/70 mb-4">{dict['review.good.body']}</p>
				<a
					href={LINKS.googleReview}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => trackEvent('review_outbound', { platform: 'google' })}
					className="btn btn-primary btn-lg w-full min-h-16 text-lg"
				>
					{dict['review.good.google']}
				</a>
				<a
					href={LINKS.yelpReview}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => trackEvent('review_outbound', { platform: 'yelp' })}
					className="btn btn-outline btn-lg w-full min-h-16 text-lg"
				>
					{dict['review.good.yelp']}
				</a>
				<button type="button" onClick={() => setStep('ask')} className="btn btn-ghost btn-sm mt-2">
					{dict['review.back']}
				</button>
			</div>
		)
	}

	if (step === 'sent') {
		return (
			<div className="flex flex-col gap-4 text-center">
				<span className="text-6xl" aria-hidden="true">💌</span>
				<h1 className="text-3xl sm:text-4xl font-bold">{dict['review.sent.heading']}</h1>
				<p className="text-base-content/70">{dict['review.sent.body']}</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl sm:text-4xl font-bold text-center">{dict['review.bad.heading']}</h1>
			<p className="text-center text-base-content/70 mb-2">{dict['review.bad.body']}</p>
			{form ? (
				// The page heading already frames the form, so hide FormRenderer's
				// own <h1> (the form's admin name) and the gap it leaves behind.
				<div className="[&_h1]:hidden [&_form]:mt-0">
					<FormRenderer
						form={form}
						translations={{ defaultSubmitLabel: dict['review.bad.submit'] }}
						onSubmitSuccess={() => {
							trackEvent('review_feedback_submit', { form_slug: form.slug })
							setStep('sent')
						}}
					/>
				</div>
			) : (
				<div className="alert">
					<span>
						{dict['review.bad.fallback']
							.replace('{email}', BUSINESS.email)
							.replace('{phone}', BUSINESS.phoneDisplay)}
					</span>
				</div>
			)}
			<button type="button" onClick={() => setStep('ask')} className="btn btn-ghost btn-sm self-center">
				{dict['review.back']}
			</button>
		</div>
	)
}
