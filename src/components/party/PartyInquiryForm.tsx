'use client'

import { useState } from 'react'
import { submitForm } from '@growth-engine/sdk-client'
import type { Dictionary } from '@/i18n'
import { BUSINESS } from '@/data/site'
import { PACKAGE_FORM_OPTIONS } from '@/data/party'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

const FORM_SLUG = 'party-inquiry'
const TABLE_COVER_COLORS = ['Undecided', 'White', 'Pink', 'Purple', 'Blue'] as const

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
		<label className={className}>
			<span className="label-text font-medium block mb-1">
				{label}
				{required && <span className="text-error ml-0.5">*</span>}
			</span>
			{children}
		</label>
	)
}

export function PartyInquiryForm({ dict }: { dict: Dictionary }) {
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
			<div className="alert alert-success">
				<span>{dict['partyform.success']}</span>
			</div>
		)
	}

	const inputCls = 'input w-full'

	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			{/* Celebrant */}
			<fieldset className="space-y-3">
				<legend className="font-display text-xl text-primary mb-2">{dict['partyform.celebrant']}</legend>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<Field label={dict['partyform.first']} required>
						<input name="celebrantFirstName" required className={inputCls} autoComplete="off" />
					</Field>
					<Field label={dict['partyform.last']} required>
						<input name="celebrantLastName" required className={inputCls} autoComplete="off" />
					</Field>
				</div>
				<Field label={dict['partyform.dob']} required>
					<input type="date" name="celebrantDob" required className={inputCls} />
				</Field>
			</fieldset>

			{/* Second celebrant */}
			<fieldset className="space-y-3">
				<legend className="font-display text-xl text-primary mb-2">{dict['partyform.celebrant2']}</legend>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<Field label={dict['partyform.first']}>
						<input name="celebrant2FirstName" className={inputCls} autoComplete="off" />
					</Field>
					<Field label={dict['partyform.last']}>
						<input name="celebrant2LastName" className={inputCls} autoComplete="off" />
					</Field>
				</div>
				<Field label={dict['partyform.dob']}>
					<input type="date" name="celebrant2Dob" className={inputCls} />
				</Field>
			</fieldset>

			{/* Host */}
			<fieldset className="space-y-3">
				<legend className="font-display text-xl text-primary mb-2">{dict['partyform.host']}</legend>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<Field label={dict['partyform.first']} required>
						<input name="hostFirstName" required className={inputCls} autoComplete="given-name" />
					</Field>
					<Field label={dict['partyform.last']} required>
						<input name="hostLastName" required className={inputCls} autoComplete="family-name" />
					</Field>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<Field label={dict['partyform.email']} required>
						<input type="email" name="email" required className={inputCls} autoComplete="email" />
					</Field>
					<Field label={dict['partyform.phone']} required>
						<input type="tel" name="phone" required className={inputCls} autoComplete="tel" />
					</Field>
				</div>
			</fieldset>

			{/* Address */}
			<fieldset className="space-y-3">
				<legend className="font-display text-xl text-primary mb-2">{dict['partyform.address']}</legend>
				<Field label={dict['partyform.address1']} required>
					<input name="address1" required className={inputCls} autoComplete="address-line1" />
				</Field>
				<Field label={dict['partyform.address2']}>
					<input name="address2" className={inputCls} autoComplete="address-line2" />
				</Field>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<Field label={dict['partyform.city']} required>
						<input name="city" required className={inputCls} autoComplete="address-level2" />
					</Field>
					<Field label={dict['partyform.state']} required>
						<input name="state" required className={inputCls} autoComplete="address-level1" />
					</Field>
					<Field label={dict['partyform.zip']} required>
						<input name="zip" required className={inputCls} autoComplete="postal-code" />
					</Field>
				</div>
			</fieldset>

			{/* Contact preference */}
			<fieldset>
				<legend className="font-medium mb-2">{dict['partyform.contactpref']}</legend>
				<div className="flex flex-col gap-2">
					{[
						{ value: 'text', label: dict['partyform.pref.text'] },
						{ value: 'email', label: dict['partyform.pref.email'] },
						{ value: 'both', label: dict['partyform.pref.both'] },
					].map((option) => (
						<label key={option.value} className="flex items-center gap-2 cursor-pointer">
							<input type="radio" name="contactPreference" value={option.value} defaultChecked={option.value === 'both'} className="radio radio-primary radio-sm" />
							<span className="text-sm">{option.label}</span>
						</label>
					))}
				</div>
			</fieldset>

			{/* Party details */}
			<fieldset className="space-y-3">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
				<Field label={dict['partyform.package']} required>
					<select name="partyPackage" required className="select w-full" defaultValue="">
						<option value="" disabled>{dict['partyform.select.placeholder']}</option>
						{PACKAGE_FORM_OPTIONS.map((option) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</Field>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<Field label={dict['partyform.guests']}>
						<input type="number" name="guestCount" min={1} max={88} className={inputCls} />
					</Field>
					<Field label={dict['partyform.tablecover']}>
						<select name="tableCoverColor" className="select w-full" defaultValue="Undecided">
							{TABLE_COVER_COLORS.map((color) => (
								<option key={color}>{color}</option>
							))}
						</select>
					</Field>
				</div>
				<Field label={dict['partyform.message']}>
					<textarea name="message" rows={4} className="textarea w-full" />
				</Field>
			</fieldset>

			{status === 'error' && (
				<div className="alert alert-warning text-sm">
					<span>
						{dict['partyform.error']
							.replace('{phone}', BUSINESS.phoneDisplay)
							.replace('{email}', BUSINESS.email)}
					</span>
				</div>
			)}

			<button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'loading'}>
				{status === 'loading' ? <span className="loading loading-spinner" /> : dict['partyform.submit']}
			</button>
		</form>
	)
}
