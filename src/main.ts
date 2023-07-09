import {cac} from 'cac'
import {version, cliname} from './constants'
import {create, useGitProxy, showGitConfig, execGitCommand, delGitConfig} from './command'
import {generateAscii} from './utils/asciitext'
const cli = cac(cliname)

cli.command('[root]') // default command
	.action(async (root: string, argv: any) => {
		if (root) {
			argv.root = root
		}
		generateAscii(cliname)
	})

cli.command('create', 'create a new project') // 增加创建指令
	.option('-f, --force', 'force overwrite if target file exists') // 强制覆盖
	.action(async (cmd) => {
		create(cmd)
	})

cli.command('init [template-name] [dir-name]', 'create a new project') // 增加创建指令
	.option('-f, --force', 'force overwrite if target file exists') // 强制覆盖
	.action(async (templateName: string, dirName: string, cmd) => {
		if (templateName && dirName) {
			create(cmd)
		} else {
			console.error('template-name or dir-name is requiry')
		}
	})

cli.command('git-config', 'configuration processing for git projects')
	.alias('gc')
	.option('-r, --rule <rule>', 'proxy rule (string match repository url)')
	.option('-n, --name <name>', 'proxy name')
	.option('-e, --email <email>', 'proxy email')
	.option('-a, --author <author>', 'proxy name and email (xxx <xxx@xx.com>)')
	.action((args) => {
		useGitProxy(args)
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
	.allowUnknownOptions()
	.action((args) => {
		execGitCommand(cli.rawArgs.slice(2))
	})

// delete proxy config
cli.command('git-delete [...rules]', 'delete your proxy config')
	.alias('gd')
	.option('-a, --all', 'delete all proxy config', {default: false})
	.action((rules, args) => {
		delGitConfig(rules, args.a)
	})

cli.version(version)
cli.help()
cli.parse()
