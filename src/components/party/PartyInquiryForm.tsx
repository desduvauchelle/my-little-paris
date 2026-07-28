'use client'

import { useState } from 'react'
import { submitForm } from '@growth-engine/sdk-client'
import type { Dictionary } from '@/i18n'
import { BUSINESS } from '@/data/site'
import { PACKAGE_FORM_OPTIONS } from '@/data/party'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import { MailIcon, MessageIcon, PhoneIcon } from '@/components/layout/ContactIcons'

const FORM_SLUG = 'party-inquiry'

type Status = 'idle' | 'loading' | 'success' | 'error'

function Field({
	label,
	required,
	children,
	className,
}: {
	label: string
	required?: boolean
	children: React.ReactNode
	className?: string
}) {
	return (
		<label className={`block${className ? ` ${className}` : ''}`}>
			<span className="label-text font-medium block mb-1">
				{label}
				{required && <span className="text-error ml-0.5">*</span>}
			</span>
			{children}
		</label>
	)
}

export function PartyInquiryForm({
	dict,
	selectedPackage,
	onPackageChange,
}: {
	dict: Dictionary
	selectedPackage: string
	onPackageChange: (value: string) => void
}) {
	const [status, setStatus] = useState<Status>('idle')

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setStatus('loading')
		const data = Object.fromEntries(new FormData(e.currentTarget).entries())
		try {
			const result = await submitForm(FORM_SLUG, data)
			if (result.ok) {
				trackEvent('party_inquiry_submit', {})
				setStatus('success')
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	if (status === 'success') {
		return (
			<div className="alert alert-success" role="status">
				<span>{dict['partyform.success']}</span>
			</div>
		)
	}

	const inputCls = 'input w-full placeholder:text-base-content/65'

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<Field label={dict['partyform.package']} required>
				<select
					name="partyPackage"
					required
					className="select w-full"
					value={selectedPackage}
					onChange={(event) => onPackageChange(event.target.value)}
				>
					<option value="" disabled>{dict['partyform.select.placeholder']}</option>
					{PACKAGE_FORM_OPTIONS.map((option) => (
						<option key={option} value={option}>{option}</option>
					))}
				</select>
			</Field>

			<Field label={dict['partyform.host']} required>
				<input name="name" required className={inputCls} autoComplete="name" placeholder={dict['partyform.placeholder.name']} />
			</Field>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Field label={dict['partyform.email']} required>
					<input type="email" name="email" required className={inputCls} autoComplete="email" placeholder={dict['partyform.placeholder.email']} />
				</Field>
				<Field label={dict['partyform.phone']} required>
					<input type="tel" name="phone" required className={inputCls} autoComplete="tel" placeholder={dict['partyform.placeholder.phone']} />
				</Field>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Field label={dict['partyform.date']} required>
					<input type="date" name="partyDate" required className={inputCls} />
				</Field>
				<Field label={dict['partyform.time']} required>
					<select name="partyTime" required className="select w-full" defaultValue="">
						<option value="" disabled>{dict['partyform.select.placeholder']}</option>
						<option>10:00 am – 12:00 pm</option>
						<option>1:00 pm – 3:00 pm</option>
						<option>4:00 pm – 6:00 pm</option>
						<option>Other</option>
					</select>
				</Field>
			</div>

			<Field label={dict['partyform.guests']} required>
				<input type="number" name="guestCount" min={1} max={88} required className={inputCls} placeholder={dict['partyform.placeholder.guests']} />
			</Field>

			{status === 'error' && (
				<div className="alert alert-warning text-sm" role="alert">
					<span>
						{dict['partyform.error']
							.replace('{phone}', BUSINESS.phoneDisplay)
							.replace('{email}', BUSINESS.email)}
					</span>
				</div>
			)}

			<button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'loading'}>
				{status === 'loading' && <span className="loading loading-spinner" aria-hidden="true" />}
				{dict['partyform.submit']}
			</button>
			<p className="text-xs leading-relaxed text-center text-base-content/60">
				{dict['partyform.confirmation.note']}
			</p>

			<div className="space-y-3 pt-2">
				<div className="flex items-center gap-3">
					<span className="h-px flex-1 bg-base-300" aria-hidden="true" />
					<p className="text-sm text-base-content/75 text-center">{dict['partyform.contact.alternative']}</p>
					<span className="h-px flex-1 bg-base-300" aria-hidden="true" />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<a href={BUSINESS.phoneHref} className="btn btn-outline btn-primary gap-2 bg-base-100">
						<PhoneIcon className="h-4 w-4" />
						{dict['partyform.contact.call']}
					</a>
					<a href={BUSINESS.smsHref} className="btn btn-outline btn-primary gap-2 bg-base-100">
						<MessageIcon className="h-4 w-4" />
						{dict['partyform.contact.text']}
					</a>
					<a href={`mailto:${BUSINESS.email}`} className="btn btn-outline btn-primary gap-2 bg-base-100">
						<MailIcon className="h-4 w-4" />
						{dict['partyform.contact.email']}
					</a>
				</div>
			</div>
		</form>
	)
}
