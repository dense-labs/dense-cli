import figlet from 'figlet'
import pc from 'picocolors'

export const figletAscii = () => {
    console.log(pc.magenta(
        '\r\n' +
          figlet.textSync('dense', {
            font: '3D-ASCII',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }))
    )
    console.log(`运行 ${pc.cyan('dense <command> --help')} 查看有关命令的详细用法. \r\n`)
}