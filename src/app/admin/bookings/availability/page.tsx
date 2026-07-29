import { AdminShell } from '@/components/booking-wireframe/AdminShell'
import { PlusIcon } from '@/components/booking-wireframe/Icons'
import styles from '@/components/booking-wireframe/booking-wireframe.module.css'

const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export default function AvailabilityPage() {
	return (
		<AdminShell active="Availability">
			<main className={styles.adminPage}>
				<header className={styles.pageHead}><div><h1>Weekly availability</h1><p>Set the bookable times and total guest capacity for a typical week.</p></div><div className={styles.headActions}><button className={styles.primaryButton} type="button">Save schedule</button></div></header>
				<div className={styles.demoNote}>Wireframe preview — these controls are visual only and do not save changes yet.</div>
				<div className={styles.settingsLayout}>
					<section className={styles.settingsPanel}>
						<div className={styles.panelTitle}><h2>Regular hours</h2><p>Capacity applies to the whole time slot, across multiple reservations.</p></div>
						{weekdays.map((day, index) => <div className={styles.dayRow} key={day}>
							<span className={styles.dayName}>{day}</span>
							<span className={`${styles.toggle} ${index === 6 ? styles.toggleOff : ''}`} aria-label={index === 6 ? 'Closed' : 'Open'} />
							{index === 6 ? <span className={styles.timeRange}>Closed</span> : <div className={styles.timeRange}><span className={styles.fieldBox}>9:00 AM</span><span>to</span><span className={styles.fieldBox}>{index >= 4 ? '5:00 PM' : '4:00 PM'}</span></div>}
							<div className={`${styles.fieldBox} ${styles.capacityBox}`}><strong>{index === 5 ? '36' : '30'}</strong><span>guests</span></div>
							<button type="button" className={styles.removeButton} aria-label={`More options for ${day}`}>•••</button>
						</div>)}
						<div className={styles.noteBox}>Each visit lasts 2 hours. New start times are offered every 2 hours, so capacity resets for each slot.</div>
						<div className={styles.allocationPreview}>
							<h3>Generated slot allocation</h3><p>This is what the customer page receives from the regular hours above.</p>
							<div className={styles.allocationRow}><strong>Mon–Fri</strong><div className={styles.slotPills}><span>9:00</span><span>11:00</span><span>1:00</span><span>3:00</span></div><strong>30 / slot</strong></div>
							<div className={styles.allocationRow}><strong>Saturday</strong><div className={styles.slotPills}><span>9:00</span><span>11:00</span><span>1:00</span><span>3:00</span><span>5:00</span></div><strong>36 / slot</strong></div>
						</div>
					</section>
					<aside className={styles.asidePanel}>
						<h3>This week at a glance</h3><p>The customer booking page will show only times with enough remaining seats for their party.</p>
						<div className={styles.summaryLine}><span>Open days</span><strong>6</strong></div>
						<div className={styles.summaryLine}><span>Time slots</span><strong>25</strong></div>
						<div className={styles.summaryLine}><span>Total capacity</span><strong>780 guests</strong></div>
						<button type="button" className={styles.primaryButton}><PlusIcon /> Add special hours</button>
					</aside>
				</div>
			</main>
		</AdminShell>
	)
}
