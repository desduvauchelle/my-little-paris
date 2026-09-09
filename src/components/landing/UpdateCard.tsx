'use client'

import { useId, useRef, useState } from 'react'
import type { UpdateFeedItem } from '@growth-engine/sdk-client'
import { UpdateBody } from './UpdateBody'

export function UpdateCard({ item, locale }: { item: UpdateFeedItem; locale: string }) {
	const dialog = useRef<HTMLDialogElement>(null)
	const trigger = useRef<HTMLButtonElement>(null)
	const titleId = useId()
	const [expanded, setExpanded] = useState(false)
	const labels = locale === 'fr' ? ['Lire la suite', 'Fermer'] : locale === 'zh' ? ['阅读全文', '关闭'] : ['Read full update', 'Close']
	const dateValue = item.eventDate ?? item.publishedAt
	const date = dateValue ? new Date(dateValue) : null
	const validDate = date && !Number.isNaN(date.getTime()) ? date : null
	const dateLabel = validDate?.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
	const open = () => { setExpanded(true); dialog.current?.showModal() }

	return (
		<>
			<div className="relative h-full overflow-hidden rounded-box border border-primary/10 bg-base-100">
				{item.imageUrl && (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={item.imageUrl} alt={item.title} loading="lazy" className="aspect-video w-full object-cover" />
				)}
				<div className="p-6">
					{validDate && <time dateTime={validDate.toISOString()} className="text-sm font-medium text-accent">{dateLabel}</time>}
					<h3 className="mt-2 mb-4 break-words font-display text-2xl text-primary">{item.title}</h3>
					<div inert className="update-preview line-clamp-6 max-h-36 overflow-hidden leading-6 [&_.prose]:leading-6 [&_.prose>*]:my-0 [&_.prose_.update-heading]:text-base [&_.prose_img]:hidden">
						<UpdateBody body={item.body} />
					</div>
					<p aria-hidden="true" className="mt-4 text-sm font-semibold text-primary">{labels[0]} →</p>
				</div>
				<button ref={trigger} type="button" aria-label={`${labels[0]}: ${item.title}`} aria-haspopup="dialog" onClick={open} className="absolute inset-0 cursor-pointer rounded-box focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-3px]" />
			</div>
			<dialog ref={dialog} aria-modal="true" aria-labelledby={titleId} className="fixed inset-0 m-0 h-dvh max-h-dvh w-screen max-w-none overflow-y-auto overscroll-contain bg-base-100 p-0 text-base-content backdrop:bg-primary/60" onClose={() => { setExpanded(false); trigger.current?.focus() }}>
				<div className="sticky top-0 z-10 flex justify-end border-b border-primary/10 bg-base-100/95 px-4 py-3 backdrop-blur">
					<button type="button" autoFocus aria-label={labels[1]} onClick={() => dialog.current?.close()} className="btn btn-ghost text-primary">{labels[1]} <span aria-hidden="true">×</span></button>
				</div>
				{expanded && (
					<div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
						{item.imageUrl && (
							// eslint-disable-next-line @next/next/no-img-element
							<img src={item.imageUrl} alt={item.title} className="mb-8 h-auto w-full rounded-box" />
						)}
						<div className="mx-auto max-w-3xl">
							{validDate && <time dateTime={validDate.toISOString()} className="text-sm text-accent">{dateLabel}</time>}
							<p id={titleId} className="mt-2 mb-6 break-words font-display text-3xl text-primary sm:text-4xl">{item.title}</p>
							<UpdateBody body={item.body} />
						</div>
					</div>
				)}
			</dialog>
		</>
	)
}
