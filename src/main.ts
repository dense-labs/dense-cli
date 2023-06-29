import { cac } from 'cac'
import { version, cliname } from './constants'
import { create } from './actions'
import { generateAscii } from './utils/asciitext'
import type { TTemplateName } from './types'
import { parseAuthor, storeProxyConfig } from './proxy'

const cli = cac(cliname)
cli.version(version)
generateAscii(cliname)

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

cli.command('config', ' user config')
	.alias('c')
	.option('-s, --set <set>', 'set config')
	.option('-g, --get <name>', 'get config')

cli
	.command('proxy', 'proxy user config')
	.alias('p')
	.option('-r, --rule <rule>', 'proxy rule (string match repository url)')
	.option('-n, --name <name>', 'proxy name')
	.option('-e, --email <email>', 'proxy email')
	.option('-a, --author <author>', 'proxy name and email (xxx <xxx@xx.com>)')
	.action(args => {
		const config = {
			rule: args.r,
			name: args.n,
			email: args.e
		}
		if (args.author) {
			// const info = parseAuthor(args.author)
			// if (info) {
			// 	config.name = info.name
			// 	config.email = info.email
			// }
		}
		// storeProxyConfig(config)
	})

cli.help(() => {
	console.log('help')
})

cli.parse()
