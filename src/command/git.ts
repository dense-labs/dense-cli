import {execSync as exec, spawn} from 'child_process'
import log from '../utils/log'
import Configstore from 'configstore'
import {name} from '../constants'
import type {IProxyConfig} from '../types'

const config = new Configstore(name, {configure: []})

function getDirName(repository: string) {
	return repository.split('/').pop().replace('.git', '')
}
/**
 * @returns 返回 Git 仓库的远程 URL
 */
export function getRepositoryUrl() {
	return exec('git config --get remote.origin.url').toString().trim()
}
/**
 * @param author - 字符串包含名称和电子邮件地址，中间使用 '|' 分隔。
 * @returns 解析后的对象，包含解析出的名称和电子邮件地址。
 * @throws 如果解析过程中出现错误。
 */
export function parseAuthor(author: string) {
	try {
		const [name, email] = author.split('<')
		return {
			name: name.trim(),
			email: email.replace('>', '').trim()
		}
	} catch (e) {
		log.err("parse author error, ensure your author is valid: 'xxxx <xxxx@xx.com>'")
	}
}
export function showGitConfig(rule?: string) {
	const proxyConfig = config.get('configure')
	if (!rule) {
		console.table(proxyConfig)
	} else {
		const config = proxyConfig.find((item: IProxyConfig) => item.rule === rule)
		if (config) console.table([config])
		else log.warning(`no proxy config found for rule: ${rule}\n`)
	}
}
/**
 * @param rules - 要删除的代理配置规则数组。
 * @param all - 是否删除所有代理配置，默认为 false。
 */
export function delGitConfig(rules: string[], all = false) {
	if (all) {
		config.set('configure', [])
	}
	const proxyConfig = config.get('configure')
	const newProxyConfig = proxyConfig.filter((config: IProxyConfig) => !rules.includes(config.rule))
	if (newProxyConfig.length < proxyConfig.length) {
		config.set('configure', newProxyConfig)
		log.info('delete success')
	}
}

export function execGitCommand(args: string[]) {
	spawn('git', args.slice(1), {stdio: 'inherit'})
	if (args.length) {
		if (args[1] === 'clone') {
			// git clone xxx
			// TODO: need to refactor
			const repo = args[2]
			execProxyConfig([], repo, `cd ${getDirName(repo)} && `)
		} else if (args[1] === 'remote') {
			// git remote add origin xxx
			if (args[2] === 'add') execProxyConfig([], args[args.length - 1])
		}
	}
}
/**
 * @param options - 代理配置选项对象，必须包含 'rule' 属性，并且 'name' 和 'email' 属性至少提供一个。
 * @param immediately - 是否立即执行代理配置，默认为 false。
 */
export function storeProxyConfig(options: IProxyConfig, immediately = false) {
	if (!options.rule || (!options.name && !options.email)) {
		log.err('Invalid options. Please set your name and email.')
		return
	}
	const configure = config.get('configure')
	const exsitConfig = configure.find((c: IProxyConfig) => c.rule === options.rule)
	if (exsitConfig) {
		exsitConfig.email = options.email || exsitConfig.email
		exsitConfig.name = options.name || exsitConfig.name
	} else {
		configure.push({
			rule: options.rule,
			name: options.name,
			email: options.email
		})
	}
	config.set('configure', configure)
	if (immediately) execProxyConfig(configure)
}

/**
 * @param proxyConfig - 代理配置数组，默认为全局配置中的 'configure'。
 * @param repository - 仓库 URL，默认为当前仓库的 URL。
 * @param precommand - 在执行 git config 命令之前添加的预命令，默认为空字符串。
 */
export function execProxyConfig(proxyConfig?: IProxyConfig[], repository?: string, precommand = '') {
	proxyConfig = proxyConfig && proxyConfig.length ? proxyConfig : config.get('configure')
	process.nextTick(() => {
		repository = repository || getRepositoryUrl()
		if (proxyConfig && proxyConfig.length > 0) {
			try {
				for (const {rule, name, email} of proxyConfig) {
					let logMsg = ''
					if (repository.includes(rule)) {
						if (name) {
							exec(`${precommand}git config --local user.name '${name}'`)
							logMsg += `\n auto set user.name to ${name};`
						} else {
							log.warning(' there has not set user.name for this repository, will use the global one.')
						}
						if (email) {
							exec(`${precommand}git config --local user.email '${email}'`)
							logMsg += `\n auto set user.email to ${email};`
						} else {
							log.warning(' there has not set user.email for this repository, will use the global one.')
						}
						if (logMsg) log.info('---------------------------' + logMsg)
						return
					}
				}
			} catch (e: any) {
				log.err(e.message)
			}
		}
	})
}
