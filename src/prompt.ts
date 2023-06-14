import inquirer from 'inquirer'
import {IpromptItem} from './types'

export const chooseTemplate = async () => {
	const choices: IpromptItem[] = [
		{
			name: 'tool',
			checked: true
		},
		{
			name: 'componetns'
		},
		{
			name: 'monorepo'
		}
	]
	const {template} = await inquirer.prompt([
		{
			name: 'template',
			type: 'list',
			message: 'Please select a template type',
			choices
		}
	])
	return template
}

export const inputProjectName = async () => {
	const {projectName} = await inquirer.prompt([
		{
			name: 'projectName',
			type: 'input',
			message: 'Please enter a project name'
		}
	])
	return projectName
}

export const isOverwriteDir = async () => {
	const {isOverwrite} = await inquirer.prompt([
		// 返回值为promise
		{
			name: 'isOverwrite', // 与返回值对应
			type: 'list', // list 类型
			message: 'Destination file already exists, please choose an action',
			choices: [
				{name: 'Overlay', value: true},
				{name: 'Cancel', value: false}
			]
		}
	])
	return isOverwrite
}
