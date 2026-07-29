'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function HeaderBookButton({
	partyPath,
	reservationsPath,
	defaultLabel,
	partyInquiryLabel,
}: {
	partyPath: string
	reservationsPath: string
	defaultLabel: string
	partyInquiryLabel: string
}) {
	const pathname = usePathname()
	const [isPartyPage, setIsPartyPage] = useState(false)

	useEffect(() => {
		setIsPartyPage(pathname === partyPath)
	}, [partyPath, pathname])

	return (
		<Link
			href={isPartyPage ? `${partyPath}#party-inquiry` : reservationsPath}
			className="btn btn-sm min-h-11 bg-white text-[#001d61] border-0 font-semibold hover:bg-white/90"
		>
			{isPartyPage ? partyInquiryLabel : defaultLabel}
		</Link>
	)
}
