import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { ScrollReveal } from './ScrollReveal'

/**
 * Hero: "one room, two worlds."
 *
 * The headline promises kids play freely *and* parents dine peacefully, so the
 * hero shows both at once rather than asserting it over an empty navy field —
 * the playroom mid-shriek, overlapped by the café's tartines. The two
 * counter-rotated frames are the whole value proposition in one glance, and
 * they carry the colour the flat navy was missing.
 *
 * The section is one grid with three children, ordered so the photos land
 * early on a phone. Stacked (mobile) the reading order is headline → photos →
 * pitch → buttons, so the visual arrives near the fold instead of ~1400px
 * down. On `lg` the two copy blocks return to the left column and the photo
 * stack spans both rows on the right.
 *
 * Both photos are `priority`: they are the LCP candidate and the reason the
 * section exists.
 */
export function Hero({ dict, locale }: { dict: Dictionary; locale: string }) {
	return (
		<section className="navy-section relative overflow-hidden">
			{/* Atmosphere: two soft colour pools lift the flat navy, and the Paris
			    motif stays as a faint watermark behind the copy. */}
			<div aria-hidden className="pointer-events-none absolute inset-0 select-none">
				<div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#3d6b9e]/30 blur-3xl" />
				<div className="absolute -bottom-56 right-1/3 h-[36rem] w-[36rem] rounded-full bg-[#e08aad]/20 blur-3xl" />
				<Image
					src="/images/paris-motif.svg"
					alt=""
					width={400}
					height={300}
					className="absolute -left-20 top-1/2 hidden w-80 -translate-y-1/2 opacity-15 lg:block"
				/>
			</div>

			<div className="container relative mx-auto px-4">
				<div className="mx-auto grid max-w-6xl items-center gap-y-8 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:grid-rows-[auto_auto] lg:gap-x-14 lg:gap-y-6 lg:py-24">
					{/* ── Copy, part one ─────────────────────────────────────── */}
					<div className="text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
						<ScrollReveal y={20} duration={0.6} start="top 95%">
							<p className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-white/70 sm:text-[0.7rem] sm:tracking-[0.2em]">
								{dict['hero.eyebrow']}
							</p>
						</ScrollReveal>

						<ScrollReveal y={30} duration={0.7} delay={0.1} start="top 95%">
							<h1 className="mt-5 font-display text-[2.1rem] italic leading-[1.1] text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.08]">
								{dict['hero.headline']}
							</h1>
						</ScrollReveal>
					</div>

					{/* ── Photo stack ────────────────────────────────────────── */}
					<ScrollReveal
						x={40}
						y={0}
						duration={0.9}
						delay={0.3}
						start="top 95%"
						className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
					>
						{/* Bottom padding leaves room for the overhanging tartine
						    frame and the chip, which sit outside the main photo. */}
						<div className="relative mx-auto w-full max-w-[19rem] pb-12 sm:max-w-md lg:max-w-none lg:pb-16">
							{/* The room, mid-shriek */}
							<div className="relative ml-auto aspect-[3/4] w-[80%] rotate-2 overflow-hidden rounded-[1.5rem] border-[6px] border-base-100 shadow-2xl shadow-black/40 lg:rounded-[1.75rem]">
								<Image
									src="/images/party-photo-1.webp"
									alt={dict['hero.photo.play.alt']}
									fill
									priority
									sizes="(max-width: 640px) 60vw, (max-width: 1024px) 45vw, 30vw"
									className="object-cover"
								/>
							</div>

							{/* The café, overlapping — the "two worlds" beat */}
							<div className="absolute bottom-0 left-0 aspect-[2/3] w-[42%] -rotate-3 overflow-hidden rounded-[1.1rem] border-[6px] border-base-100 shadow-xl shadow-black/40 lg:rounded-[1.25rem]">
								<Image
									src="/images/toast.webp"
									alt={dict['hero.photo.food.alt']}
									fill
									priority
									sizes="(max-width: 640px) 32vw, (max-width: 1024px) 24vw, 16vw"
									className="object-cover"
								/>
							</div>

							{/* Two facts a parent wants before anything else */}
							<div className="absolute -top-3 left-0 rounded-full bg-secondary px-3.5 py-1.5 text-[0.7rem] font-semibold text-secondary-content shadow-lg sm:px-4 sm:py-2 sm:text-xs lg:-left-4">
								{dict['hero.badge.ages']}
							</div>
							<div className="absolute -bottom-1 right-0 rounded-full bg-base-100 px-3.5 py-1.5 text-[0.7rem] font-semibold text-primary shadow-lg sm:px-4 sm:py-2 sm:text-xs lg:-right-3">
								{dict['hero.badge.session']}
							</div>
						</div>
					</ScrollReveal>

					{/* ── Copy, part two ─────────────────────────────────────── */}
					<div className="text-center lg:col-start-1 lg:row-start-2 lg:self-start lg:text-left">
						<ScrollReveal y={20} delay={0.22} start="top 95%">
							<p className="mx-auto max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
								{dict['hero.sub']}
							</p>
						</ScrollReveal>

						<ScrollReveal y={20} delay={0.34} start="top 95%">
							<div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
								<Link
									href={localizedPath('/reservations', locale)}
									className="btn border-0 bg-white text-[#001d61] shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-white sm:btn-lg"
								>
									{dict['hero.cta.reserve']}
								</Link>
								<Link
									href={localizedPath('/party', locale)}
									className="btn btn-outline border-white/40 text-white transition-transform hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#001d61] sm:btn-lg"
								>
									{dict['hero.cta.party']}
								</Link>
							</div>

							<p className="mx-auto mt-6 max-w-md text-sm text-white/55 lg:mx-0">{dict['hero.proof']}</p>
						</ScrollReveal>
					</div>
				</div>
			</div>
		</section>
	)
}
