import { cac } from 'cac'
import pc from 'picocolors'
import figlet from 'figlet'
import { chooseTemplate } from './prompt'
export {version} from '../package.json'
const cli = cac('dm')
cli.version('1.0.0')

cli
  .command('create', '创建一个新项目') // 增加创建指令
  .option('-f, --force', '如果目标文件存在，则强制覆盖') // 强制覆盖
  .action(async (cmd) => {
    const template = await chooseTemplate()
  })

cli
  .command('init <template-name> <project-name>', '创建一个新项目') // 增加创建指令
  .option('-f, --force', '如果目标文件存在，则强制覆盖') // 强制覆盖
  .action(async (templateName, projectName, cmd) => {
    console.log('init <template-name> <project-name>')
  })

cli.help(() => {
  console.log(
    '\r\n' +
      figlet.textSync('dm', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })
  )
  console.log(`运行 ${pc.cyan('dm <command> --help')} 查看有关命令的详细用法. \r\n`)
})

cli.command('list', '查看所有模板类型').action(() => {
  console.log('查看所有模板类型')
})

cli.parse()