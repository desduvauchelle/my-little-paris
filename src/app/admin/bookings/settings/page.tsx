import { AdminShell } from '@/components/booking-wireframe/AdminShell'
import styles from '@/components/booking-wireframe/booking-wireframe.module.css'

export default function BookingSettingsPage() {
	return (
		<AdminShell active="Settings">
			<main className={styles.adminPage}>
				<header className={styles.pageHead}><div><h1>Booking settings</h1><p>Define the rules customers see when reserving a table.</p></div><button type="button" className={styles.primaryButton}>Save settings</button></header>
				<div className={styles.demoNote}>Wireframe preview — these controls are visual only and do not save changes yet.</div>
				<section className={styles.settingsPanel} style={{maxWidth:760}}>
					<div className={styles.panelTitle}><h2>Reservation rules</h2><p>Applies to regular Eat & Play bookings.</p></div>
					<div className={styles.subsection}><div className={styles.formGrid}>
						<label className={styles.fieldLabel}>Visit duration<select defaultValue="120"><option value="120">2 hours</option></select></label>
						<label className={styles.fieldLabel}>Maximum online party size<select defaultValue="6"><option value="6">6 guests</option></select></label>
						<label className={styles.fieldLabel}>Minimum notice<select defaultValue="2"><option value="2">2 hours</option></select></label>
						<label className={styles.fieldLabel}>Booking window<select defaultValue="60"><option value="60">60 days ahead</option></select></label>
						<label className={`${styles.fieldLabel} ${styles.span2}`}>Confirmation message<textarea defaultValue="Your table is held for 15 minutes after your reservation time. We can’t wait to welcome your family!" /></label>
					</div></div>
				</section>
			</main>
		</AdminShell>
	)
}
