import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { ScrollReveal } from './ScrollReveal'

export function Hero({ dict, locale }: { dict: Dictionary; locale: string }) {
	return (
		<section className="navy-section relative overflow-hidden">
			<Image
				src="/images/paris-motif.svg"
				alt=""
				width={400}
				height={300}
				aria-hidden
				className="pointer-events-none select-none absolute -right-10 top-1/2 -translate-y-1/2 w-72 opacity-25 hidden md:block"
			/>
			<Image
				src="/images/paris-motif.svg"
				alt=""
				width={400}
				height={300}
				aria-hidden
				className="pointer-events-none select-none absolute -left-16 top-1/2 -translate-y-1/2 w-72 opacity-15 -scale-x-100 hidden lg:block"
			/>
			<div className="hero min-h-[64vh]">
				<div className="hero-content text-center py-20">
					<div className="max-w-3xl">
						<ScrollReveal y={20} duration={0.6} start="top 95%">
							<p className="text-xs tracking-[0.25em] uppercase text-white/60 mb-5">
								{dict['hero.eyebrow']}
							</p>
						</ScrollReveal>
						<ScrollReveal y={30} duration={0.7} delay={0.1} start="top 95%">
							<h1 className="font-display italic text-4xl md:text-6xl md:leading-tight text-white">
								{dict['hero.headline']}
							</h1>
						</ScrollReveal>
						<ScrollReveal y={20} delay={0.25} start="top 95%">
							<p className="py-6 text-lg text-white/80 max-w-2xl mx-auto">{dict['hero.sub']}</p>
						</ScrollReveal>
						<ScrollReveal y={20} delay={0.4} start="top 95%">
							<div className="flex flex-wrap gap-4 justify-center mb-6">
								<Link
									href={localizedPath('/reservations', locale)}
									className="btn btn-lg bg-white text-[#001d61] border-0 hover:bg-white/90"
								>
									{dict['hero.cta.reserve']}
								</Link>
								<Link
									href={localizedPath('/party', locale)}
									className="btn btn-lg btn-outline text-white border-white/50 hover:bg-white hover:text-[#001d61] hover:border-white"
								>
									{dict['hero.cta.party']}
								</Link>
							</div>
							<p className="text-sm text-white/60">{dict['hero.proof']}</p>
						</ScrollReveal>
					</div>
				</div>
			</div>
		</section>
	)
}
