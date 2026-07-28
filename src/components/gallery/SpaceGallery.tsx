import Image from 'next/image'

const SPACE_PHOTOS = [
	{
		src: '/images/space-afternoon-tea.webp',
		alt: 'A guest enjoying afternoon tea beside the indoor playground at My Little Paris',
		position: 'object-[center_56%]',
	},
	{
		src: '/images/space-overview.webp',
		alt: 'A wide view of the bright indoor playground at My Little Paris',
		position: 'object-center',
	},
	{
		src: '/images/space-cafe-play.webp',
		alt: 'The café seating area beside the indoor playground',
		position: 'object-center',
	},
	{
		src: '/images/space-party-room.webp',
		alt: 'The private event space decorated for a pastel birthday party',
		position: 'object-center',
	},
	{
		src: '/images/space-play-table-v2.webp',
		alt: 'Children playing together at a wooden activity table',
		position: 'object-center',
	},
	{
		src: '/images/space-princess-event.webp',
		alt: 'Children meeting a princess during a special event',
		position: 'object-center',
	},
	{
		src: '/images/space-celebration-v2.webp',
		alt: 'The private room arranged for an elegant birthday celebration',
		position: 'object-center',
	},
] as const

function Photo({
	index,
	className,
	sizes,
	caption,
	captionClassName = '',
}: {
	index: number
	className: string
	sizes: string
	caption?: string
	captionClassName?: string
}) {
	const photo = SPACE_PHOTOS[index]

	return (
		<figure className={`group relative overflow-hidden bg-base-300 ${className}`}>
			<Image
				src={photo.src}
				alt={photo.alt}
				fill
				sizes={sizes}
				className={`object-cover ${photo.position}`}
			/>
			{caption && (
				<figcaption className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 via-primary/40 to-transparent px-5 pb-4 pt-14 text-sm font-medium text-white md:px-6 md:pb-5 ${captionClassName}`}>
					{caption}
				</figcaption>
			)}
		</figure>
	)
}

export function SpaceGallery({
	variant = 'showcase',
	ariaLabel,
	playCaption,
	partyCaption,
}: {
	variant?: 'showcase' | 'compact'
	ariaLabel: string
	playCaption?: string
	partyCaption?: string
}) {
	if (variant === 'compact') {
		return (
			<div className="grid grid-cols-2 gap-2 overflow-hidden rounded-box" aria-label={ariaLabel}>
				<Photo
					index={0}
					className="col-span-2 aspect-[16/9]"
					sizes="(max-width: 768px) calc(100vw - 4rem), 640px"
				/>
				<Photo index={1} className="aspect-[4/3]" sizes="(max-width: 768px) 45vw, 320px" />
				<Photo index={2} className="aspect-[4/3]" sizes="(max-width: 768px) 45vw, 320px" />
			</div>
		)
	}

	return (
		<div aria-label={ariaLabel}>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-[minmax(0,1.45fr)_minmax(0,0.8fr)] md:grid-rows-2 md:gap-4">
				<Photo
					index={0}
					className="col-span-2 aspect-[4/3] rounded-box md:col-span-1 md:row-span-2 md:aspect-auto md:min-h-[34rem]"
					sizes="(max-width: 768px) calc(100vw - 2rem), 64vw"
					caption={playCaption}
				/>
				<Photo index={1} className="aspect-[4/3] rounded-box md:aspect-auto" sizes="(max-width: 768px) 50vw, 34vw" />
				<Photo
					index={3}
					className="aspect-[4/3] rounded-box md:aspect-auto"
					sizes="(max-width: 768px) 50vw, 34vw"
					caption={partyCaption}
					captionClassName="hidden md:block"
				/>
			</div>

			<div className="mt-3 grid grid-cols-2 gap-3 md:mt-4 md:grid-cols-4 md:gap-4">
				<Photo index={2} className="aspect-[4/3] rounded-box" sizes="(max-width: 768px) 50vw, 25vw" />
				<Photo index={4} className="aspect-[4/3] rounded-box" sizes="(max-width: 768px) 50vw, 25vw" />
				<Photo index={5} className="aspect-[4/3] rounded-box" sizes="(max-width: 768px) 50vw, 25vw" />
				<Photo index={6} className="aspect-[4/3] rounded-box" sizes="(max-width: 768px) 50vw, 25vw" />
			</div>
		</div>
	)
}
