'use client'

import { useState } from 'react'
import { submitForm } from '@growth-engine/sdk-client'
import type { Dictionary } from '@/i18n'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function Newsletter({ dict }: { dict: Dictionary }) {
	const [email, setEmail] = useState('')
	const [status, setStatus] = useState<Status>('idle')

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!email) return
		setStatus('loading')
		try {
			const result = await submitForm('newsletter', { email })
			if (result.ok) {
				trackEvent('newsletter_signup', {})
				setStatus('success')
				setEmail('')
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	return (
		<section className="navy-section py-16">
			<div className="container mx-auto px-4 text-center max-w-2xl">
				<h2 className="font-display text-3xl mb-3 text-white">{dict['newsletter.heading']}</h2>
				<p className="text-white/75 mb-6">{dict['newsletter.body']}</p>

				{status === 'success' ? (
					<div className="alert alert-success max-w-md mx-auto">
						<span>{dict['newsletter.success']}</span>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="join w-full max-w-md">
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder={dict['newsletter.placeholder']}
							className="input join-item flex-1 text-base-content"
							aria-label={dict['newsletter.placeholder']}
						/>
						<button type="submit" className="btn join-item bg-white text-[#001d61] border-0 hover:bg-white/90" disabled={status === 'loading'}>
							{status === 'loading' ? <span className="loading loading-spinner loading-sm" /> : dict['newsletter.cta']}
						</button>
					</form>
				)}

				{status === 'error' && (
					<p className="text-sm text-white/70 mt-3">{dict['newsletter.error']}</p>
				)}
			</div>
		</section>
	)
}
