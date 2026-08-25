'use client'

import type { Dictionary } from '@/i18n'
import { BUSINESS } from '@/data/site'
import type { PartyPackageSelection } from '@/data/party'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import { MailIcon, MessageIcon, PhoneIcon } from '@/components/layout/ContactIcons'

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
	onChoosePackage,
}: {
	dict: Dictionary
	selectedPackage: PartyPackageSelection | null
	onChoosePackage: () => void
}) {
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const data = Object.fromEntries(new FormData(e.currentTarget).entries())
		const value = (key: string) => String(data[key] ?? '').trim()
		const subject = dict['partyform.email.subject']
			.replace('{date}', value('partyDate'))
			.replace('{name}', value('name'))
		const body = [
			dict['partyform.email.greeting'],
			'',
			dict['partyform.email.intro'],
			'',
			`${dict['partyform.package']}: ${value('partyPackage')}`,
			`${dict['partyform.host']}: ${value('name')}`,
			`${dict['partyform.email']}: ${value('email')}`,
			`${dict['partyform.phone']}: ${value('phone')}`,
			`${dict['partyform.date']}: ${value('partyDate')}`,
			`${dict['partyform.time']}: ${value('partyTime')}`,
			`${dict['partyform.guests']}: ${value('guestCount')}`,
			'',
			dict['partyform.email.closing'],
		].join('\n')

		trackEvent('party_inquiry_email_open', { party_package: value('partyPackage') })
		window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
	}

	const inputCls = 'input w-full placeholder:text-base-content/65'

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<p className="label-text font-medium mb-1">{dict['partyform.package']}<span className="text-error ml-0.5">*</span></p>
				{selectedPackage ? (
					<div className="rounded-box border border-base-300 bg-base-200/60 p-4 sm:p-5" aria-live="polite">
						<input type="hidden" name="partyPackage" value={selectedPackage.formValue} />
						<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
							<div>
								<p className="text-xs font-semibold uppercase tracking-wide text-base-content/70">
									{dict['partyform.package.selected']}
								</p>
								<h3 className="font-display text-2xl leading-tight text-primary mt-1">
									{selectedPackage.package.name}
								</h3>
								<p className="text-sm text-base-content/70 mt-1">{selectedPackage.package.tier}</p>
							</div>
							<button type="button" onClick={onChoosePackage} className="btn btn-outline btn-primary btn-sm sm:shrink-0">
								{dict['partyform.package.change']}
							</button>
						</div>
						<div className={`grid gap-4 mt-4 pt-4 border-t border-base-300 ${selectedPackage.package.deposit ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
							<div>
								<p className="text-xs uppercase tracking-wide text-base-content/70">{dict['party.weekday']}</p>
								<p className="text-lg font-bold text-primary">{selectedPackage.package.weekday}</p>
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-base-content/70">{dict['party.weekend']}</p>
								<p className="text-lg font-bold text-primary">{selectedPackage.package.weekend}</p>
							</div>
							{selectedPackage.package.deposit && (
								<div className="col-span-2 sm:col-span-1">
									<p className="text-xs uppercase tracking-wide text-base-content/70">{dict['party.deposit']}</p>
									<p className="text-lg font-bold text-primary">{selectedPackage.package.deposit}</p>
								</div>
							)}
						</div>
						<p className="text-sm leading-relaxed text-base-content/70 mt-3">{selectedPackage.package.capacity}</p>
					</div>
				) : (
					<div className="rounded-box border border-dashed border-primary/35 bg-base-200/50 p-5 text-center">
						<p className="font-medium text-primary">{dict['partyform.package.choose']}</p>
						<p className="text-sm text-base-content/70 mt-1">{dict['partyform.package.choose.help']}</p>
						<button type="button" onClick={onChoosePackage} className="btn btn-outline btn-primary mt-4">
							{dict['partyform.package.choose']} ↑
						</button>
					</div>
				)}
			</div>

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

			<button type="submit" className="btn btn-primary btn-lg btn-block" disabled={!selectedPackage}>
				<MailIcon className="h-5 w-5" />
				{dict['partyform.submit']}
			</button>
			<p className="text-xs leading-relaxed text-center text-base-content/70">
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
