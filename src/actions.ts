import pc from 'picocolors'
import {downloadObject, isExistsFile, updatePackageName} from './create'
import {chooseTemplate, isGitRepoInitialized, isAutoInstall, inputProjectName} from './prompt'
import {createGitRepo, resolveDirPath, installDependencies} from './utils'
import {downLogger} from './utils/animation'
import {genGradientText} from './utils/asciitext'
import {templates} from './constants'
import type {ITemplates} from './types'
import log from './utils/log'

export async function create(options: any) {
	const projectName = await inputProjectName()
	const name = await chooseTemplate()
	const isExists = await isExistsFile(name, options)
	// 判断指定目录是否存在
	if (isExists) return
	const dir = resolveDirPath(name)
	const isInitGit = await isGitRepoInitialized()
	const {downloadUrl} = templates[name as keyof ITemplates]
	await downLogger(downloadObject(downloadUrl, dir, {clone: false}))
	if (isInitGit) {
		// 在指定目录下初始化 Git 仓库
		await createGitRepo(dir)
	}
	await updatePackageName(projectName, dir)
	const isInstall = await isAutoInstall()

	if (isInstall) {
		log.info('📦  Installing additional dependencies...\n')
		await installDependencies(dir)
		log.info(`🎉  Successfully created project ${pc.yellow(name)}.`)
	} else {
		log.info(`\n👉 Get started with the following commands:\n\n $ ${pc.cyan('cd ' + genGradientText(name))}\n $ ${pc.cyan('npm install')} \n $ ${pc.cyan('npm run dev')} \n`)
	}
}
