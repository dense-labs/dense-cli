import pc from 'picocolors'
import logSymbols from 'log-symbols'
const MESSAGE_PREFIX = '[dense-cli]: '
export const clg = console.log

export const log = {
	err: (msg: string) => {
		clg(logSymbols.error, pc.red(msg))
	},
	warning: (msg: string) => {
		clg(logSymbols.warning, pc.yellow(msg))
	},
	info: (msg: string) => {
		clg(logSymbols.info, pc.bold(msg))
	}
}

/**
 * Logs a info message.
 * @param {string} msg
 */
export function info(msg: string) {
	console.info(pc.bold(MESSAGE_PREFIX) + msg)
}

/**
 * Logs a warning message.
 * @param {string} msg
 */
export function warn(msg: string) {
	console.warn(pc.bold(MESSAGE_PREFIX) + msg)
}

/**
 * Logs an error message.
 * @param {string} msg
 */
export function error(msg: string) {
	console.error(pc.bold(MESSAGE_PREFIX) + msg)
}
export default log
