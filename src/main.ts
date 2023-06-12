import { cac } from 'cac'
import { chooseTemplate } from './prompt'
import { version } from '../package.json'
import { generateAscii} from './utils'
const binName = 'dense'
const cli = cac(binName)
cli.version(version)
generateAscii(binName)

cli
  .command('create', '创建一个新项目') // 增加创建指令
  .option('-f, --force', '如果目标文件存在，则强制覆盖') // 强制覆盖
  .action(async (cmd) => {
    const template = await chooseTemplate()
    console.log(template)
  })

cli
  .command('init <template-name> <project-name>', '创建一个新项目') // 增加创建指令
  .option('-f, --force', '如果目标文件存在，则强制覆盖') // 强制覆盖
  .action(async (templateName, projectName, cmd) => {
    console.log('init <template-name> <project-name>')
  })

cli.help(() => {
})

cli.command('list', '查看所有模板类型').action(() => {

})
cli.parse()
