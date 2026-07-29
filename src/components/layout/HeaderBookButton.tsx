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
			className="btn btn-secondary btn-sm min-h-11 border-0 font-semibold"
		>
			{label}
		</Link>
	)
}
