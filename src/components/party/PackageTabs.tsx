'use client'

import { useState } from 'react'
import type { Dictionary } from '@/i18n'
import {
	PACKAGE_FORM_VALUES,
	PACKAGE_GROUPS,
	PARTY_DEPOSIT,
	type PartyPackage,
	type PartyPackageSelection,
} from '@/data/party'
import {
	PRIVATE_ROOM_DETAIL_ROWS,
	PRIVATE_ROOM_PACKAGE_DETAILS,
	type PrivateRoomPackageId,
} from '@/data/private-room-package-details'
import { cn } from '@/lib/utils'
import { BalloonCelebration } from '@/components/ui/BalloonCelebration'
import { PartyInquiryForm } from './PartyInquiryForm'

const POPULAR_PRIVATE_ROOM_PACKAGE_ID: PrivateRoomPackageId = 'concorde'

export function PackageTabs({ dict }: { dict: Dictionary }) {
	const [active, setActive] = useState(0)
	const [catered, setCatered] = useState(true)
	const [selectedPackage, setSelectedPackage] = useState<PartyPackageSelection | null>(null)
	const group = PACKAGE_GROUPS[active]
	const variant = catered ? group.catered : group.rentalOnly
	const showPrivateRoomDetails = group.id === 'private-room' && catered

	function handlePackageInquiry(partyPackage: PartyPackage) {
		setSelectedPackage({ formValue: PACKAGE_FORM_VALUES[partyPackage.id], package: partyPackage })

		requestAnimationFrame(() => {
			const target = document.getElementById('party-inquiry')
			const heading = document.getElementById('party-inquiry-heading')
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
			heading?.focus({ preventScroll: true })
		})
	}

	function handleChoosePackage() {
		requestAnimationFrame(() => {
			const target = document.getElementById('party-packages')
			const heading = document.getElementById('party-packages-heading')
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
			heading?.focus({ preventScroll: true })
		})
	}

	function handleViewDetails(packageId: PrivateRoomPackageId) {
		requestAnimationFrame(() => {
			const scroller = document.getElementById('package-details-table-scroll')
			const column = document.querySelector<HTMLElement>(`[data-detail-package="${packageId}"]`)
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

			if (scroller && column) {
				scroller.scrollTo({
					left: Math.max(0, column.offsetLeft - 144),
					behavior: reduceMotion ? 'auto' : 'smooth',
				})
			}
		})
	}

	return (
		<div>
			{/* Tab buttons */}
			<div role="group" aria-label={dict['party.packages.heading']} className="flex flex-wrap justify-center gap-3 mb-5">
				{PACKAGE_GROUPS.map((g, i) => (
					<button
						key={g.id}
						aria-pressed={active === i}
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
				{variant.packages.map((pkg) => {
					const hasDetails = PRIVATE_ROOM_PACKAGE_DETAILS.some((details) => details.id === pkg.id)

					return (
					<div
						key={pkg.id}
						data-testid={`package-card-${pkg.id}`}
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
						<div className="card-body grid grid-rows-[auto_auto_auto_1fr_auto] gap-0">
							<div className="lg:min-h-24">
								<p className="text-xs tracking-widest uppercase text-base-content/65">{pkg.tier}</p>
								<h3 className="font-display text-3xl leading-tight text-primary mt-3">{pkg.name}</h3>
							</div>

							<div className="grid grid-cols-2 gap-5 py-4">
								<div>
									<p className="text-xs uppercase tracking-wide text-base-content/65">{dict['party.weekday']}</p>
									<p className="text-2xl font-bold text-primary">{pkg.weekday}</p>
								</div>
								<div>
									<p className="text-xs uppercase tracking-wide text-base-content/65">{dict['party.weekend']}</p>
									<p className="text-2xl font-bold text-primary">{pkg.weekend}</p>
								</div>
							</div>

							<p className="text-xs leading-relaxed text-base-content/70 lg:min-h-12 mb-4">👥 {pkg.capacity}</p>

							<div>
								<p className="text-xs font-semibold tracking-widest uppercase text-base-content/65 mb-3">
									{dict['party.included']}
								</p>
								<ul className="text-sm space-y-1">
									{pkg.includes.map((line) => (
										<li key={line} className="flex gap-2">
											<span className="text-secondary">•</span>
											<span>{line}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="card-actions flex-col gap-2 mt-6">
								{showPrivateRoomDetails && hasDetails && (
									<a
										href="#package-details"
										onClick={() => handleViewDetails(pkg.id as PrivateRoomPackageId)}
										className="btn btn-ghost btn-sm btn-block text-primary font-medium"
									>
										{dict['party.details.view']} ↓
									</a>
								)}
								<BalloonCelebration>
									<button type="button" onClick={() => handlePackageInquiry(pkg)} className="btn btn-primary btn-block">
										{dict['party.book'].replace('{name}', pkg.name)}
									</button>
								</BalloonCelebration>
							</div>
						</div>
					</div>
					)
				})}
			</div>

			{/* Secondary booking details follow the package comparison. */}
			<div className="max-w-3xl mx-auto mt-10 pt-6 border-t border-base-300 text-center space-y-2">
				<p className="text-sm font-semibold text-primary">{PARTY_DEPOSIT}</p>
				<p className="text-sm text-base-content/75">{variant.description}</p>
				<p className="text-xs text-base-content/65">{variant.serviceFee}</p>
				{variant.extraTime && <p className="text-xs text-base-content/65">{variant.extraTime}</p>}
				{variant.addOns && (
					<p className="text-xs text-base-content/70">
						🍜 {dict['party.addons']}: {variant.addOns.join(' · ')}
					</p>
				)}
			</div>

			{showPrivateRoomDetails && (
				<section id="package-details" className="scroll-mt-24 mt-16" aria-labelledby="package-details-heading">
					<div className="text-center max-w-2xl mx-auto mb-8">
						<h3 id="package-details-heading" className="font-display text-3xl text-primary">
							{dict['party.details.heading']}
						</h3>
						<p className="text-sm text-base-content/65 mt-2">{dict['party.details.sub']}</p>
						<p className="sm:hidden text-xs font-medium text-primary mt-3">{dict['party.details.swipe']} →</p>
					</div>

					<div
						id="package-details-table-scroll"
						tabIndex={0}
						aria-label={dict['party.details.heading']}
						className="overflow-x-auto overscroll-x-contain rounded-box border border-base-300 bg-base-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					>
						<table className="table table-fixed min-w-[64rem] align-top">
							<caption className="sr-only">{dict['party.details.heading']}</caption>
							<colgroup>
								<col className="w-36" />
								{PRIVATE_ROOM_PACKAGE_DETAILS.map((details) => (
									<col key={details.id} className="w-72" />
								))}
							</colgroup>
							<thead>
								<tr className="border-base-300">
									<th scope="col" className="sticky left-0 z-20 bg-base-200 text-base-content/65">
										{dict['party.details.category']}
									</th>
								{PRIVATE_ROOM_PACKAGE_DETAILS.map((details) => (
									<th
										key={details.id}
										data-detail-package={details.id}
										scope="col"
										className={cn(
											'align-top py-5',
											details.id === POPULAR_PRIVATE_ROOM_PACKAGE_ID && 'bg-secondary/10',
										)}
									>
										<span className="block text-xs uppercase tracking-wide text-base-content/65">{details.level}</span>
										<span className="block font-display text-2xl normal-case text-primary mt-1">{details.name}</span>
										{details.id === POPULAR_PRIVATE_ROOM_PACKAGE_ID && (
											<span className="badge badge-secondary badge-sm mt-2 normal-case">
												{dict['party.badge.popular']}
											</span>
										)}
										<span className="block text-xs normal-case font-normal text-base-content/65 mt-2 leading-relaxed">
												{details.summary}
											</span>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{PRIVATE_ROOM_DETAIL_ROWS.map((row) => (
									<tr key={row.id} className="border-base-300">
										<th scope="row" className="sticky left-0 z-10 align-top bg-base-200 text-sm text-primary py-5">
											{row.label}
										</th>
										{PRIVATE_ROOM_PACKAGE_DETAILS.map((details) => {
											const cell = details.details[row.id]

											return (
												<td
													key={details.id}
													className={cn(
														'align-top py-5',
														details.id === POPULAR_PRIVATE_ROOM_PACKAGE_ID && 'bg-secondary/10',
													)}
												>
													<p className="text-sm font-semibold text-base-content">{cell.selection}</p>
													{cell.items.length > 0 && (
														<ul className="mt-2 space-y-1 text-xs leading-relaxed text-base-content/70">
															{cell.items.map((item) => (
																<li key={item} className="flex gap-2">
																	<span className="text-secondary" aria-hidden="true">•</span>
																	<span>{item}</span>
																</li>
															))}
														</ul>
													)}
												</td>
											)
										})}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="text-xs text-base-content/65 text-center mt-4">{dict['party.details.note']}</p>
				</section>
			)}

			<section id="party-inquiry" className="scroll-mt-24 max-w-2xl mx-auto mt-16 pt-16 border-t border-base-300">
				<div className="text-center mb-8">
					<h2 id="party-inquiry-heading" tabIndex={-1} className="font-display text-4xl text-primary focus:outline-none">
						{dict['partyform.heading']}
					</h2>
					<p className="text-base-content/70 mt-3">{dict['party.cta.body']}</p>
				</div>
				<PartyInquiryForm
					dict={dict}
					selectedPackage={selectedPackage}
					onChoosePackage={handleChoosePackage}
				/>
			</section>
		</div>
	)
}
