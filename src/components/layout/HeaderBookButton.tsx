import Link from 'next/link'

export function HeaderBookButton({
	reservationsPath,
	label,
}: {
	reservationsPath: string
	label: string
}) {
	return (
		<Link
			href={reservationsPath}
			data-ga-event="cta_click"
			data-ga-location="header"
			className="btn btn-secondary btn-sm min-h-11 border-0 font-semibold"
		>
			{label}
		</Link>
	)
}
