'use client'

import { useState } from 'react'
import { submitForm } from '@growth-engine/sdk-client'
import type { Dictionary } from '@/i18n'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

/**
 * Local renderer for the Growth Engine "contact-form".
 *
 * The SDK ships a `FormRenderer`, but it hardcodes the form name as an `<h1>`.
 * On /contact that produced a second `<h1>` alongside the page heading — the
 * `multiple_h1` finding from the site crawl. Rendering the form here lets the
 * page keep exactly one `<h1>` and gives the form a plain `<h2>` beneath it.
 *
 * Behaviour otherwise mirrors the SDK component: fields sorted by `order`,
 * client-side `required`, and submission through `submitForm`.
 */

export interface ContactFormField {
	name: string
	label: string
	type: string
	order: number
	required?: boolean
	placeholder?: string
	options?: string[]
}

export interface ContactFormShape {
	slug: string
	fields: ContactFormField[]
}

function initialValues(fields: ContactFormField[]): Record<string, unknown> {
	return Object.fromEntries(fields.map((field) => [field.name, field.type === 'checkbox' ? false : '']))
}

export function ContactForm({ form, dict }: { form: ContactFormShape; dict: Dictionary }) {
	const sortedFields = [...form.fields].sort((a, b) => a.order - b.order)
	const [values, setValues] = useState<Record<string, unknown>>(() => initialValues(sortedFields))
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState('')

	function updateField(name: string, value: unknown) {
		setValues((prev) => ({ ...prev, [name]: value }))
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setError('')
		setSubmitting(true)
		try {
			const result = await submitForm(form.slug, values)
			if (!result.ok) {
				setError(
					result.validationErrors?.map((issue) => issue.message).join(', ')
						|| result.error
						|| dict['contact.form.error'],
				)
				return
			}
			trackEvent('contact_form_submit', { form_slug: form.slug })
			setSubmitted(true)
		} catch {
			setError(dict['contact.form.error'])
		} finally {
			setSubmitting(false)
		}
	}

	if (submitted) {
		return (
			<div className="alert alert-success" role="status">
				<span>{dict['contact.form.success']}</span>
			</div>
		)
	}

	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">{dict['contact.form.heading']}</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				{sortedFields.map((field) => {
					const value = values[field.name]
					return (
						<div key={field.name} className="form-control w-full">
							{field.type === 'checkbox' ? (
								<label className="label cursor-pointer justify-start gap-3">
									<input
										type="checkbox"
										id={field.name}
										required={field.required}
										checked={Boolean(value)}
										onChange={(e) => updateField(field.name, e.target.checked)}
										className="checkbox"
									/>
									<span className="label-text">{field.placeholder ?? field.label}</span>
								</label>
							) : (
								<>
									<label htmlFor={field.name} className="label">
										<span className="label-text">
											{field.label}
											{field.required && <span className="ml-1 text-error">*</span>}
										</span>
									</label>
									{field.type === 'textarea' ? (
										<textarea
											id={field.name}
											required={field.required}
											placeholder={field.placeholder}
											rows={4}
											value={String(value ?? '')}
											onChange={(e) => updateField(field.name, e.target.value)}
											className="textarea textarea-bordered w-full"
										/>
									) : field.type === 'select' ? (
										<select
											id={field.name}
											required={field.required}
											value={String(value ?? '')}
											onChange={(e) => updateField(field.name, e.target.value)}
											className="select select-bordered w-full"
										>
											<option value="">{field.placeholder ?? dict['contact.form.select']}</option>
											{(field.options ?? []).map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>
									) : (
										<input
											type={field.type}
											id={field.name}
											required={field.required}
											placeholder={field.placeholder}
											value={String(value ?? '')}
											onChange={(e) => updateField(field.name, e.target.value)}
											className="input input-bordered w-full"
										/>
									)}
								</>
							)}
						</div>
					)
				})}

				{error && (
					<div className="alert alert-error" role="alert">
						<span>{error}</span>
					</div>
				)}

				<button type="submit" disabled={submitting} className="btn btn-primary w-full">
					{submitting ? dict['contact.form.submitting'] : dict['contact.form.submit']}
				</button>
			</form>
		</>
	)
}
