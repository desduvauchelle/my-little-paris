import Link from 'next/link'
import type { Dictionary } from '@/i18n'
import { localizedPath } from '@/lib/i18n-utils'
import { ScrollReveal } from './ScrollReveal'

function OutingIllustration() {
	return (
		<svg
			aria-hidden="true"
			className="h-auto w-full"
			viewBox="0 0 1200 390"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{/* A single little Paris: book at the kiosk, play in the middle,
			    then settle around a proper café table. */}
			<path d="M0 326C160 297 279 347 438 326C631 301 775 337 934 319C1046 306 1115 310 1200 327V390H0V326Z" fill="#E8E2DB" />
			<path d="M52 327C241 303 335 347 502 325C687 301 821 338 1148 321" stroke="#E08AAD" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 18" />

			{/* Booking kiosk */}
			<g transform="translate(50 66)">
				<path d="M30 77H272V278H30V77Z" fill="#FDFBF8" stroke="#001D61" strokeWidth="6" />
				<path d="M14 77L42 29H260L288 77H14Z" fill="#E08AAD" stroke="#001D61" strokeWidth="6" strokeLinejoin="round" />
				<path d="M63 30L50 77M111 30L105 77M159 30V77M207 30L214 77M255 30L271 77" stroke="#FDFBF8" strokeWidth="14" />
				<path d="M14 77C14 94 25 106 40 106C55 106 67 94 67 77C67 94 79 106 94 106C109 106 121 94 121 77C121 94 133 106 148 106C163 106 175 94 175 77C175 94 187 106 202 106C217 106 229 94 229 77C229 94 241 106 256 106C271 106 288 94 288 77" fill="#E08AAD" stroke="#001D61" strokeWidth="6" strokeLinejoin="round" />
				<rect x="88" y="133" width="126" height="100" rx="12" fill="#FFFFFF" stroke="#001D61" strokeWidth="5" />
				<path d="M88 163H214" stroke="#001D61" strokeWidth="5" />
				<path d="M118 123V145M184 123V145" stroke="#001D61" strokeWidth="7" strokeLinecap="round" />
				<path d="M117 186L140 208L185 178" stroke="#E08AAD" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
				<circle cx="260" cy="239" r="30" fill="#D9A441" stroke="#001D61" strokeWidth="5" />
				<path d="M249 240L257 248L272 230" stroke="#001D61" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
			</g>

			{/* Montessori-inspired play structure */}
			<g transform="translate(424 49)">
				<circle cx="174" cy="63" r="44" fill="#D9A441" opacity=".28" />
				<path d="M62 277L112 104H215L268 277" stroke="#001D61" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M91 183H238M104 144H225M79 224H252" stroke="#001D61" strokeWidth="7" strokeLinecap="round" />
				<path d="M214 105C250 146 267 168 309 190C333 203 345 227 345 255V277H259V249C259 225 249 209 226 195C201 180 184 158 170 139" fill="#3D6B9E" stroke="#001D61" strokeWidth="7" strokeLinejoin="round" />
				<path d="M231 128C261 161 278 174 316 195" stroke="#6A9BBF" strokeWidth="8" strokeLinecap="round" />
				<path d="M15 277C19 224 39 192 75 181C111 192 131 224 135 277H15Z" fill="#E08AAD" opacity=".72" stroke="#001D61" strokeWidth="6" strokeLinejoin="round" />
				<path d="M28 277L75 193L121 277M49 277L75 232L100 277" stroke="#001D61" strokeWidth="5" strokeLinecap="round" />
				<circle cx="365" cy="65" r="9" fill="#E08AAD" />
				<circle cx="26" cy="73" r="6" fill="#3D6B9E" />
				<path d="M330 111C343 90 362 90 375 111C362 132 343 132 330 111Z" fill="#FDFBF8" stroke="#001D61" strokeWidth="5" />
			</g>

			{/* Bistro table */}
			<g transform="translate(836 46)">
				<path d="M52 113C83 44 226 44 257 113H52Z" fill="#E08AAD" stroke="#001D61" strokeWidth="6" strokeLinejoin="round" />
				<path d="M82 112C104 59 122 59 137 112M176 112C190 59 208 59 228 112" stroke="#FDFBF8" strokeWidth="15" />
				<path d="M154 111V290" stroke="#001D61" strokeWidth="8" strokeLinecap="round" />
				<path d="M101 290H207" stroke="#001D61" strokeWidth="8" strokeLinecap="round" />
				<ellipse cx="154" cy="203" rx="126" ry="22" fill="#FDFBF8" stroke="#001D61" strokeWidth="6" />
				<path d="M87 213L72 294M221 213L236 294" stroke="#001D61" strokeWidth="8" strokeLinecap="round" />
				<path d="M113 196C113 175 130 158 151 158H167V196H113Z" fill="#3D6B9E" stroke="#001D61" strokeWidth="5" />
				<path d="M167 169H177C190 169 190 189 177 189H167" stroke="#001D61" strokeWidth="5" />
				<path className="how-scene-steam how-scene-steam-one" d="M128 149C117 137 141 129 130 116" stroke="#E08AAD" strokeWidth="5" strokeLinecap="round" />
				<path className="how-scene-steam how-scene-steam-two" d="M151 148C139 134 164 127 152 110" stroke="#E08AAD" strokeWidth="5" strokeLinecap="round" />
				<path d="M185 190C202 166 235 167 248 190C229 201 205 202 185 190Z" fill="#D9A441" stroke="#001D61" strokeWidth="5" strokeLinejoin="round" />
				<path d="M204 177C209 185 217 190 227 193" stroke="#FDFBF8" strokeWidth="4" strokeLinecap="round" />
				<path d="M40 232H78L93 291H25L40 232Z" fill="#3D6B9E" stroke="#001D61" strokeWidth="6" strokeLinejoin="round" />
				<path d="M230 232H268L283 291H215L230 232Z" fill="#3D6B9E" stroke="#001D61" strokeWidth="6" strokeLinejoin="round" />
			</g>
		</svg>
	)
}

export function HowItWorks({ dict, locale }: { dict: Dictionary; locale: string }) {
	const steps = [
		{ title: dict['home.how.step1.title'], body: dict['home.how.step1.body'] },
		{ title: dict['home.how.step2.title'], body: dict['home.how.step2.body'] },
		{ title: dict['home.how.step3.title'], body: dict['home.how.step3.body'] },
	]

	return (
		<section className="relative overflow-hidden bg-base-100 py-20 sm:py-24">
			<div aria-hidden className="absolute inset-x-0 top-0 h-2 bg-secondary" />
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-6xl">
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="text-balance font-display text-4xl leading-tight text-primary sm:text-5xl">
							{dict['home.how.heading']}
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-base-content/70">{dict['home.how.sub']}</p>
					</div>

					<ScrollReveal y={28} className="mt-9 sm:mt-12">
						<div className="overflow-hidden rounded-[1.75rem] bg-base-200 px-2 pt-5 shadow-[0_18px_45px_-28px_rgba(0,29,97,0.45)] sm:px-7 sm:pt-7">
							<OutingIllustration />
						</div>
					</ScrollReveal>

					<ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0">
						{steps.map((step, index) => (
							<li key={step.title} className="relative px-2 text-center md:px-8 md:not-first:border-l md:not-first:border-primary/15">
								<div aria-hidden="true" className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-display text-2xl text-secondary-content shadow-[0_5px_0_#001d61]">
									{index + 1}
								</div>
								<h3 className="font-display text-2xl text-primary">{step.title}</h3>
								<p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-base-content/70 sm:text-base">{step.body}</p>
							</li>
						))}
					</ol>

					<div className="mt-11 text-center">
						<Link href={localizedPath('/reservations', locale)} className="btn btn-primary btn-lg shadow-[0_7px_0_#e08aad] transition-transform hover:-translate-y-0.5">
							{dict['hero.cta.reserve']}
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
