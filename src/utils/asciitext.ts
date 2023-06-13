import figlet from 'figlet'
import gradient from 'gradient-string'
export function generateAscii(str: string) {
	console.log(genGradientText('🎉 Welcome to dense-cli scaffolding'))
	figletAscii(str)
}
export const figletAscii = (asciiText: string) => {
	const text = genGradientText(
		'\r\n' +
			figlet.textSync(`${asciiText}`, {
				font: 'Puffy',
				horizontalLayout: 'default',
				verticalLayout: 'default',
				width: 100,
				whitespaceBreak: true
			})
	)
	console.log(text)
	console.log(`run ${genGradientText(asciiText + ' <command> --help')} View detailed usage of the command. \r\n`)
}

export function genGradientText(gradText: string) {
	const gradientText = gradient('cyan', 'magenta').multiline(gradText)
	return gradientText
}
