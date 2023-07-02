import {cac} from 'cac'
import {version, cliname} from './constants'
import {create} from './actions'
import {generateAscii} from './utils/asciitext'
import type {TTemplateName} from './types'
import {parseAuthor, storeProxyConfig, showGitConfig, execGitCommand, delGitConfig} from './config'
const cli = cac(cliname)
cli.version(version)

cli.command('create', 'create a new project') // 增加创建指令
	.option('-f, --force', 'force overwrite if target file exists') // 强制覆盖
	.action(async (cmd) => {
		create(cmd)
	})

cli.command('init <template-name> <dir-name>', 'create a new project') // 增加创建指令
	.option('-f, --force', 'force overwrite if target file exists') // 强制覆盖
	.action(async (templateName: TTemplateName, dirName: string, cmd) => {
		create(cmd)
	})

cli.command('git-config', 'configuration processing for git projects')
	.alias('gc')
	.option('-r, --rule <rule>', 'proxy rule (string match repository url)')
	.option('-n, --name <name>', 'proxy name')
	.option('-e, --email <email>', 'proxy email')
	.option('-a, --author <author>', 'proxy name and email (xxx <xxx@xx.com>)')
	.action((args) => {
		const config = {
			rule: args.r,
			name: args.n,
			email: args.e
		}
		if (args.author) {
			const info = parseAuthor(args.author)
			if (info) {
				config.name = info.name
				config.email = info.email
			}
		}
		storeProxyConfig(config)
	})


cli.command('git-show', 'show your proxy config')
	.alias('gs')
	.option('-l, --list', 'show all proxy config', {default: true})
	.option('-r, --rule <rule>', 'show <rule> proxy config')
	.action((args) => {
		showGitConfig(args.r)
	})

cli.command('git-proxy', 'proxy git command')
	.alias('gp')
	.action((args) => {
		execGitCommand(cli.rawArgs.slice(2))
	})

// delete proxy config
cli.command('git-delete [...rules]', 'delete your proxy config')
	.alias('gd')
	.option('-a, --all', 'delete all proxy config', { default: false })
	.action((rules, args) => {
		delGitConfig(rules, args.a)
	})

cli.on('command:*', () => {
	console.error('Invalid command: %s', cli.rawArgs.join(' ') + '\n')
	generateAscii(cliname)
	process.exit(1)
})

cli.help(() => {
	console.log('help')
})

cli.parse()
