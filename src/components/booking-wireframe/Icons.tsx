import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			{children}
		</svg>
	)
}

export function CalendarIcon(props: IconProps) {
	return <Icon {...props}><path d="M6 2v4M18 2v4M3.5 9.5h17M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z" /></Icon>
}

export function ClockIcon(props: IconProps) {
	return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
}

export function UsersIcon(props: IconProps) {
	return <Icon {...props}><path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 11a3.5 3.5 0 0 0 0-7M18 14a4 4 0 0 1 3 3.9V20" /></Icon>
}

export function PauseIcon(props: IconProps) {
	return <Icon {...props}><path d="M8 5v14M16 5v14" /></Icon>
}

export function SettingsIcon(props: IconProps) {
	return <Icon {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.55V21h-4v-.08A1.7 1.7 0 0 0 8.97 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15.03 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.6 8.97a1.7 1.7 0 0 0-.34-1.88l-.06-.06L7.03 4.2l.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 10 3.08V3h4v.08a1.7 1.7 0 0 0 1.03 1.52 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" /></Icon>
}

export function ChevronLeftIcon(props: IconProps) {
	return <Icon {...props}><path d="m15 18-6-6 6-6" /></Icon>
}

export function ChevronRightIcon(props: IconProps) {
	return <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
}

export function PlusIcon(props: IconProps) {
	return <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>
}

export function ArrowLeftIcon(props: IconProps) {
	return <Icon {...props}><path d="M19 12H5m6-6-6 6 6 6" /></Icon>
}

export function CheckIcon(props: IconProps) {
	return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>
}

export function SparkleIcon(props: IconProps) {
	return <Icon {...props}><path d="M12 3c.6 4.8 3.2 7.4 8 8-4.8.6-7.4 3.2-8 8-.6-4.8-3.2-7.4-8-8 4.8-.6 7.4-3.2 8-8Z" /></Icon>
}
