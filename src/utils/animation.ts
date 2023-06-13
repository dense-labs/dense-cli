import createLogger from 'progress-estimator'
const logger = createLogger({
	/* spinner: {
		interval: 140,
		// frames: ['🙈 ', '🙈 ', '🙉 ', '🙊 ']
		// frames: ['🚶 ', '🏃 ']
		// frames: ['◐', '◓', '◑', '◒']
	} */
})
export async function downLogger(fn: Promise<void>) {
	await logger(fn, 'Download time-consuming: ', {
		estimate: 7000
	})
}
