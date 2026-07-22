'use client'

import { useState } from 'react'
import type { Dictionary } from '@/i18n'
import { PACKAGE_GROUPS, TIME_SLOTS } from '@/data/party'
import { cn } from '@/lib/utils'

export function PackageTabs({ dict }: { dict: Dictionary }) {
	const [active, setActive] = useState(0)
	const [catered, setCatered] = useState(true)
	const group = PACKAGE_GROUPS[active]
	const variant = catered ? group.catered : group.rentalOnly

	return (
		<div>
			{/* Tab buttons */}
			<div role="tablist" className="flex flex-wrap justify-center gap-3 mb-5">
				{PACKAGE_GROUPS.map((g, i) => (
					<button
						key={g.id}
						role="tab"
						aria-selected={active === i}
						onClick={() => setActive(i)}
						className={cn('btn rounded-full', active === i ? 'btn-primary' : 'btn-outline btn-primary')}
					>
						{g.emoji} {g.label}
					</button>
				))}
			</div>

			{/* Catering toggle — off shows the venue-rental (bring your own food) pricing */}
			<div className="flex justify-center mb-8">
				<label className="label cursor-pointer gap-3">
					<input
						type="checkbox"
						className="toggle toggle-primary"
						checked={catered}
						onChange={(e) => setCatered(e.target.checked)}
					/>
					<span className="label-text font-medium">
						{catered ? dict['party.catering.on'] : dict['party.catering.off']}
					</span>
				</label>
			</div>

			{/* Group intro */}
			<div className="text-center max-w-2xl mx-auto mb-8">
				<p className="text-base-content/75 mb-2">{variant.description}</p>
				<p className="text-xs text-base-content/55">{variant.serviceFee}</p>
				{variant.extraTime && <p className="text-xs text-base-content/55">{variant.extraTime}</p>}
			</div>

			{/* Time slots — plain info text, deliberately not button-shaped */}
			<p className="text-center text-sm text-base-content/70 mb-10">
				<span className="font-semibold tracking-widest uppercase text-xs text-base-content/50">
					{dict['party.slots.heading']}
				</span>
				{'  🕐 '}
				{TIME_SLOTS.join('  ·  ')}
			</p>

			{/* Package cards */}
			<div
				className={cn(
					'grid grid-cols-1 gap-6 items-stretch',
					variant.packages.length === 3
						? 'lg:grid-cols-3'
						: variant.packages.length === 2
							? 'md:grid-cols-2 max-w-3xl mx-auto'
							: 'max-w-md mx-auto',
				)}
			>
				{variant.packages.map((pkg) => (
					<div
						key={pkg.id}
						className={cn(
							'card bg-base-100 shadow-sm border relative',
							pkg.badge === 'popular' ? 'border-secondary shadow-lg' : 'border-base-300',
						)}
					>
						{/* Floating badge — absolutely positioned so it never shifts the card content */}
						{pkg.badge && (
							<span
								className={cn(
									'badge absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap shadow-sm',
									pkg.badge === 'popular' ? 'badge-secondary' : 'badge-accent',
								)}
							>
								{pkg.badge === 'popular' ? dict['party.badge.popular'] : dict['party.badge.allinclusive']}
							</span>
						)}
						<div className="card-body">
							<p className="text-xs tracking-widest uppercase text-base-content/50">{pkg.tier}</p>
							<h3 className="font-display text-3xl text-primary">{pkg.name}</h3>

							<div className="flex gap-6 my-3">
								<div>
									<p className="text-xs uppercase tracking-wide text-base-content/50">{dict['party.weekday']}</p>
									<p className="text-2xl font-bold text-primary">{pkg.weekday}</p>
								</div>
								<div>
									<p className="text-xs uppercase tracking-wide text-base-content/50">{dict['party.weekend']}</p>
									<p className="text-2xl font-bold text-primary">{pkg.weekend}</p>
								</div>
							</div>

							<p className="text-xs text-base-content/60 mb-2">👥 {pkg.capacity}</p>

							<p className="text-xs font-semibold tracking-widest uppercase text-base-content/50">
								{dict['party.included']}
							</p>
							<ul className="text-sm space-y-1 mb-3">
								{pkg.includes.map((line) => (
									<li key={line} className="flex gap-2">
										<span className="text-secondary">•</span>
										<span>{line}</span>
									</li>
								))}
							</ul>
							<ul className="text-xs text-base-content/55 space-y-0.5 mb-4">
								{pkg.deposit.map((line) => (
									<li key={line}>{line}</li>
								))}
							</ul>

							<div className="card-actions mt-auto">
								<a href="#book" className="btn btn-primary btn-block">
									{dict['party.book'].replace('{name}', pkg.name)}
								</a>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Add-ons */}
			{variant.addOns && (
				<p className="text-center text-sm text-base-content/60 mt-8">
					🍜 {dict['party.addons']}: {variant.addOns.join(' · ')}
				</p>
			)}
		</div>
	)
}
