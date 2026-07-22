import type { Dictionary } from '@/i18n'
import type { MenuSection } from '@/data/menu'
import { ScrollReveal } from '@/components/landing/ScrollReveal'

export function MenuJumpNav({
	sections,
	extraLinks,
	label,
}: {
	sections: MenuSection[]
	extraLinks?: { href: string; label: string }[]
	label: string
}) {
	return (
		<nav aria-label={label} className="flex flex-wrap justify-center gap-2 mb-12">
			{sections.map((section) => (
				<a key={section.id} href={`#${section.id}`} className="btn btn-sm btn-outline btn-primary rounded-full">
					{section.title}
				</a>
			))}
			{extraLinks?.map((link) => (
				<a key={link.href} href={link.href} className="btn btn-sm btn-primary rounded-full">
					{link.label}
				</a>
			))}
		</nav>
	)
}

export function MenuSections({ sections, dict }: { sections: MenuSection[]; dict: Dictionary }) {
	return (
		<div className="max-w-3xl mx-auto space-y-14">
			{sections.map((section) => (
				<ScrollReveal key={section.id} y={30}>
					<section id={section.id} className="scroll-mt-28">
						<h2 className="font-display text-3xl text-primary text-center mb-1">{section.title}</h2>
						{section.intro && (
							<p className="text-center text-sm text-base-content/60 italic mb-6">{section.intro}</p>
						)}
						<div className="divider mt-0 mb-4" />
						<ul className="space-y-5">
							{section.items.map((item) => (
								<li key={item.name} className="grid grid-cols-[1fr_auto] gap-x-4">
									<div>
										<h3 className="font-semibold">
											{item.name}
											{item.isNew && <span className="badge badge-secondary badge-sm ml-2 align-middle">{dict['eat.new']}</span>}
										</h3>
										{item.description && <p className="text-sm text-base-content/70">{item.description}</p>}
										{item.note && <p className="text-xs text-base-content/50 italic">* {item.note}</p>}
									</div>
									<span className="font-medium text-primary whitespace-nowrap">{item.price}</span>
								</li>
							))}
						</ul>
					</section>
				</ScrollReveal>
			))}
		</div>
	)
}
