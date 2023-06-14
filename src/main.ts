import {cac} from 'cac'
import {version, cliname} from '../package.json'
import {create} from './actions'
import {generateAscii} from './utils/asciitext'
import {TTemplateName} from './types'

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

cli.help(() => {
	console.log('help')
})

cli.parse()
