import figlet from 'figlet'
import boxen from 'boxen'
import gradient from 'gradient-string'

export function generateAscii(str: string) {
    console.log(genGradientText('🎉 Welcome to dense-cli scaffolding'))
    figletAscii(str)
}
export const figletAscii = (e: string) => {
    console.log(genGradientText(
        '\r\n' +
          figlet.textSync(`${e}`, {
            font: '3D-ASCII',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 100,
            whitespaceBreak: true
        }))
    )
    console.log(`run ${genGradientText( e + ' <command> --help')} View detailed usage of the command. \r\n`)
}

export function genGradientText(str: string) {
    const gradientText = gradient('cyan', 'magenta').multiline(str)
    return gradientText
}

export function boxenAscii(str: string) {
    const text = genGradientText(
        figlet.textSync(`${str}`, {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
    }))
    const upgradeMessage = boxen(text, {
        align: 'center',
        borderStyle: 'round',
        borderColor: 'magenta',
        dimBorder: true,
        padding: {top: 1, right: 10, bottom: 1, left: 10}
    })
    return upgradeMessage
}

