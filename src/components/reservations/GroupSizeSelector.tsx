'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface SizeOption {
	key: string
	icon: string
	title: string
	body: string
}

// Choose-your-path booking flow: nothing is preselected, so the first thing
// anyone sees is the question "how many of you are there?" — three visibly
// equal choices. Only once a size is picked does the matching booking info
// appear.
//
// Native radios (visually hidden, cards are their labels) rather than a
// tablist: this is a one-of-three choice, and it starts with nothing chosen —
// a tablist with no selected tab is a broken pattern. Radios also give
// arrow-key navigation and the "N of 3" announcement for free.
//
// Panels are server-rendered ReactNodes passed in as props, so this component
// only owns the selection state.
export function GroupSizeSelector({
	prompt,
	options,
	panels,
}: {
	prompt: string
	options: SizeOption[]
	panels: Record<string, React.ReactNode>
}) {
	const [selected, setSelected] = useState<string | null>(null)
	const groupName = useId()
	const panelRef = useRef<HTMLDivElement>(null)
	const hasScrolled = useRef(false)

	// On the first pick the panel appears below the fold (especially on mobile,
	// where the three choices stack) — bring it into view so the next step isn't
	// hidden. Switching sizes afterwards stays put. This runs in an effect, not
	// a rAF callback, so it fires after React has committed the taller layout
	// and doesn't depend on the page being visible.
	useEffect(() => {
		if (selected === null || hasScrolled.current) return
		hasScrolled.current = true
		panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}, [selected])

	return (
		<div>
			<h2 id={`${groupName}-prompt`} className="font-display text-3xl text-primary text-center mb-6">
				{prompt}
			</h2>

			<div role="radiogroup" aria-labelledby={`${groupName}-prompt`} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				{options.map((option) => {
					const active = option.key === selected
					return (
						<label
							key={option.key}
							className={cn(
								'card border-2 transition-all cursor-pointer',
								'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary',
								active
									? 'border-primary bg-primary text-primary-content shadow-md'
									: 'border-base-300 bg-base-100 hover:border-primary/40 hover:shadow-sm',
							)}
						>
							<input
								type="radio"
								name={groupName}
								value={option.key}
								checked={active}
								onChange={() => setSelected(option.key)}
								aria-controls={`panel-${option.key}`}
								className="sr-only"
							/>
							<span className="card-body p-5 flex-row items-center gap-4">
								<span className="text-3xl" aria-hidden="true">{option.icon}</span>
								<span>
									<span className="block font-semibold">{option.title}</span>
									<span className={cn('block text-sm', active ? 'text-primary-content/80' : 'text-base-content/60')}>
										{option.body}
									</span>
								</span>
							</span>
						</label>
					)
				})}
			</div>

			<div ref={panelRef} className={cn(selected && 'mt-10 scroll-mt-24')}>
				{options.map((option) => (
					<div key={option.key} id={`panel-${option.key}`} hidden={option.key !== selected}>
						{panels[option.key]}
					</div>
				))}
			</div>
		</div>
	)
}
