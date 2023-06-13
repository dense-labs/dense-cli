import {cac} from 'cac'
import {version} from '../package.json'
import {chooseTemplate} from './prompt'
import {isExistsFile} from './create'
import {generateAscii, genGradientText} from './utils/asciitext'
import {downLogger} from './utils/animation'

const binName = 'dense'
const cli = cac(binName)
cli.version(genGradientText(version))
generateAscii(binName)

downLogger(
	new Promise<void>((resolve, inject) => {
		setTimeout(() => {
			resolve()
		}, 3000)
	})
)

cli.command('create', 'create a new project') // 增加创建指令
	.option('-f, --force', 'force overwrite if target file exists') // 强制覆盖
	.action(async (cmd) => {
		const name = await chooseTemplate()
		const isExists = await isExistsFile(name, cmd)
		if (isExists) return
		console.log(name)
	})

cli.command('init <template-name> <project-name>', 'create a new project') // 增加创建指令
	.option('-f, --force', 'force overwrite if target file exists') // 强制覆盖
	.action(async (templateName, projectName, cmd) => {
		console.log('init <template-name> <project-name>', templateName, projectName, cmd)
	})

cli.help(() => {
	console.log('help')
})

cli.parse()
