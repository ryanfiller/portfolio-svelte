export interface AnalyticsData {
	event: string
	title?: string
}

export default function sendToAnalytics({ event, title = '' }: AnalyticsData) {
	if (typeof window === 'undefined') return

	const goatcounter = window.goatcounter

	if (!goatcounter) return

	goatcounter.count({
		// this is... confusingly named...
		path: event,
		title,
		// always logs this as an event
		event: true
	})
}
