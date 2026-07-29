/*
THESIS: A living weekly ledger makes shared capacity obvious; it refuses a KPI-first dashboard.
OWN-WORLD: Deep navy, paper white, dusty pink, ledger lines, compact rounded controls.
STORY: Staff scan bookings, understand remaining seats, spot private holds, and add a reservation.
FIRST VIEWPORT: A slim status strip leads into a full-width seven-day booking grid with capacity inside each entry.
FORM: Fifth grounded structure—weekly ledger with the present schedule dominant; seed 5bd289e6.
*/
import { AdminShell } from '@/components/booking-wireframe/AdminShell'
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@/components/booking-wireframe/Icons'
import styles from '@/components/booking-wireframe/booking-wireframe.module.css'

const days = [
	['MON', '24'], ['TUE', '25'], ['WED', '26'], ['THU', '27'], ['FRI', '28'], ['SAT', '29'], ['SUN', '30'],
]

const rows = [
	{ time: '9:00 AM', cells: [[['Nora Chen','4 guests']], [], [['Maya Lee','3 guests']], [], [['James Kim','5 guests']], [['Ava Martin','4 guests'],['Liam Wong','3 guests']], []] },
	{ time: '11:00 AM', cells: [[['Olivia Park','6 guests']], [['Emma Davis','2 guests']], [], [['Sophie Tran','4 guests']], [['Chloe Nguyen','3 guests']], [['Private event','Birthday party']], [['Mia Johnson','5 guests']]] },
	{ time: '1:00 PM', cells: [[], [['Leo Garcia','5 guests']], [['Amelia Wu','4 guests']], [['Noah Smith','6 guests']], [], [['Private event','Birthday party']], [['Lucas Brown','4 guests']]] },
	{ time: '3:00 PM', cells: [[['Ella Thompson','3 guests']], [], [], [['Ethan Lin','5 guests']], [['Isla Wilson','2 guests']], [['Harper Lee','6 guests']], []] },
]

export default function BookingsAdminPage() {
	return (
		<AdminShell active="Bookings">
			<main className={styles.adminPage}>
				<header className={styles.pageHead}>
					<div><h1>Bookings</h1><p>See every visit, shared time slot, and private event in one place.</p></div>
					<div className={styles.headActions}><button className={styles.secondaryButton} type="button">Today</button><button className={styles.primaryButton} type="button"><PlusIcon /> Add booking</button></div>
				</header>
				<div className={styles.demoNote}>Wireframe preview — names, dates, and capacity figures on this page are illustrative.</div>
				<section className={styles.statStrip} aria-label="Booking summary">
					<div className={styles.stat}><span>Tuesday&apos;s bookings</span><strong>2</strong><small>visible below</small></div>
					<div className={styles.stat}><span>Guests expected</span><strong>7</strong><small>across 2 slots</small></div>
					<div className={styles.stat}><span>Busiest slot</span><strong>1:00</strong><small>5 of 30 seats</small></div>
					<div className={styles.stat}><span>Week capacity</span><strong>9%</strong><small>74 of 780 seats</small></div>
				</section>
				<section className={styles.calendarPanel} aria-label="Weekly bookings">
					<div className={styles.calendarToolbar}>
						<div><button className={styles.iconButton} aria-label="Previous week"><ChevronLeftIcon /></button><button className={styles.iconButton} aria-label="Next week"><ChevronRightIcon /></button><h2>August 24–30, 2026</h2></div>
						<div className={styles.legend}><span><i className={styles.dot} /> Eat & Play</span><span><i className={`${styles.dot} ${styles.dotPink}`} /> Group</span></div>
					</div>
					<div className={styles.weekGrid}>
						<div className={styles.timeHead} />
						{days.map(([weekday,date], index) => <div className={`${styles.dayHead} ${index === 1 ? styles.dayToday : ''}`} key={weekday}>{weekday}<strong>{date}</strong></div>)}
						{rows.flatMap((row, rowIndex) => [
							<div className={styles.timeLabel} key={`${row.time}-label`}>{row.time}</div>,
							...row.cells.map((entries, dayIndex) => <div className={styles.slotCell} key={`${row.time}-${dayIndex}`}>
								{entries.map(([name, party]) => name === 'Private event' ?
									<div className={styles.privateHold} key={name}><span>PRIVATE HOLD</span><strong>{party}</strong><span>Slot closed</span></div> :
									<div className={`${styles.booking} ${Number.parseInt(party) >= 6 ? styles.bookingPink : ''}`} key={name}><strong>{name}</strong>{party}</div>
								)}
								{entries.length > 0 && entries[0]?.[0] !== 'Private event' && <span className={styles.cellCapacity}>{30 - entries.reduce((sum, entry) => sum + Number.parseInt(entry[1]), 0)} seats remain</span>}
							</div>),
						])}
					</div>
				</section>
			</main>
		</AdminShell>
	)
}
