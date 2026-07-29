import { AdminShell } from '@/components/booking-wireframe/AdminShell'
import { PlusIcon } from '@/components/booking-wireframe/Icons'
import styles from '@/components/booking-wireframe/booking-wireframe.module.css'

const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export default function AvailabilityPage() {
	return (
		<AdminShell active="Availability">
			<main className={styles.adminPage}>
				<header className={styles.pageHead}><div><h1>Weekly availability</h1><p>Set regular booking hours, then override them for closures and private events.</p></div><div className={styles.headActions}><a className={styles.secondaryButton} href="#exceptions"><PlusIcon /> Add exception</a><button className={styles.primaryButton} type="button">Save schedule</button></div></header>
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
						<a href="#exceptions" className={styles.primaryButton}><PlusIcon /> Add closure or event</a>
					</aside>
				</div>

				<div className={`${styles.settingsLayout} ${styles.exceptionSection}`} id="exceptions">
					<section className={styles.settingsPanel}>
						<div className={styles.panelTitle}><h2>Add a schedule exception</h2><p>An exception overrides the regular hours above for one date or time range.</p></div>
						<div className={styles.subsection}>
							<div className={styles.formGrid}>
								<label className={styles.fieldLabel}>What is happening?<select defaultValue="private"><option value="closed">Closed all day</option><option value="blocked">Block a time range</option><option value="private">Private birthday or event</option></select></label>
								<label className={styles.fieldLabel}>Date<input type="date" defaultValue="2026-09-26" /></label>
								<label className={styles.fieldLabel}>From<input type="time" defaultValue="11:00" /></label>
								<label className={styles.fieldLabel}>Until<input type="time" defaultValue="13:00" /></label>
								<label className={styles.fieldLabel}>What should be unavailable?<select defaultValue="venue"><option value="venue">Entire venue</option><option value="party-room">Party room only</option><option value="tables">Selected table capacity</option></select></label>
								<label className={styles.fieldLabel}>Reason or event name<input defaultValue="Birthday party" /></label>
							</div>
							<p className={styles.exceptionHint}><strong>Closing all day?</strong> Choose “Closed all day”; the start and end times will be ignored.</p>
							<button className={styles.primaryButton} type="button"><PlusIcon /> Add this exception</button>
						</div>
					</section>

					<aside className={styles.settingsPanel}>
						<div className={styles.panelTitle}><h2>Upcoming exceptions</h2><p>These replace regular availability for the affected times.</p></div>
						<div className={`${styles.subsection} ${styles.closureList}`}>
							<div className={styles.closureRow}><div className={styles.dateTile}><span>AUG</span><strong>29</strong></div><div><h3>Emma&apos;s birthday</h3><p>11:00 AM–3:00 PM · Entire venue</p></div><span className={styles.status}>PRIVATE EVENT</span></div>
							<div className={styles.closureRow}><div className={styles.dateTile}><span>SEP</span><strong>07</strong></div><div><h3>Exceptional closure</h3><p>Closed all day · No time slots shown</p></div><span className={`${styles.status} ${styles.statusNavy}`}>DAY PAUSED</span></div>
						</div>
					</aside>
				</div>
			</main>
		</AdminShell>
	)
}
