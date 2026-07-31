type InstagramPostEmbedProps = {
	embedUrl: string
	title: string
}

export function InstagramPostEmbed({
	embedUrl,
	title,
}: InstagramPostEmbedProps) {
	return (
		<div className="mx-auto mt-14 max-w-xl overflow-hidden rounded-box bg-white shadow-sm ring-1 ring-base-300">
			<iframe
				src={embedUrl}
				title={title}
				loading="lazy"
				allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				className="h-[720px] w-full border-0 sm:h-[760px]"
			/>
		</div>
	)
}
