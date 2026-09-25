'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import { classifyClick } from '@/lib/click-analytics'

/**
 * One document-level listener that sends a GA4 event for every conversion-type
 * link click (booking, email, phone, text, directions, waiver, social) — no
 * per-link wiring, so new links are covered automatically.
 *
 * Internal links can opt in with `data-ga-event="cta_click"` (plus optional
 * `data-ga-location`) for CTAs worth measuring.
 */
export function ClickTracker() {
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			try {
				if (!(event.target instanceof Element)) return
				const anchor = event.target.closest('a')
				if (!anchor) return
				const href = anchor.getAttribute('href') ?? ''
				const location = anchor.getAttribute('data-ga-location') ?? undefined
				const text = (anchor.textContent ?? '').trim().slice(0, 100)
				const common = {
					page_path: window.location.pathname,
					...(location ? { link_location: location } : {}),
					...(text ? { link_text: text } : {}),
				}

				const explicit = anchor.getAttribute('data-ga-event')
				if (explicit) {
					trackEvent(explicit, { ...common, link_url: href })
					return
				}
				const classified = classifyClick(href)
				if (classified) trackEvent(classified.name, { ...common, ...classified.params })
			} catch (err) {
				console.error('[analytics] click tracking failed:', err)
			}
		}
		document.addEventListener('click', handleClick, true)
		return () => document.removeEventListener('click', handleClick, true)
	}, [])

	return null
}
