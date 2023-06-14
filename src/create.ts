import download from 'download-git-repo'
import fs from 'fs-extra'
import ora, {Ora} from 'ora'
import path from 'path'
import pc from 'picocolors'
import {Ioptions} from './types'
import {isOverwriteDir} from './prompt'
import log, {clg} from './utils/log'
const spinner: Ora = ora()
export const isExistsFile = async (name: string, options: Ioptions) => {
	// 获取当前工作目录
	const cwd = process.cwd()
	// 当前绝对路径
	const targetDirectory = path.join(cwd, name)
	// 判断目录是否存在
	if (fs.existsSync(targetDirectory)) {
		// 判断是否使用 --force 参数
		if (options.force) {
			// 删除重名目录(remove是个异步方法)
			await fs.remove(targetDirectory)
			return false
		} else {
			const isOverwrite = await isOverwriteDir()
			// 选择 Cancel
			if (!isOverwrite) {
				return true
			} else {
				// 选择 Overwirte ，先删除掉原有重名目录
				try {
					spinner.start('deleting...')
					await fs.remove(targetDirectory)
					spinner.succeed(`successfully deleted ${pc.gray(name)}`)
				} catch (error) {
					spinner.fail('Overwrite failed, please try again')
					process.exit(1)
				}
				return false
			}
		}
	} else {
		return false
	}
}
export const downloadObject = async (url: string, content: any, opt: any) => {
	return new Promise((resolve, reject) => {
		download(url, content, opt, (err: string) => {
			if (err) {
				log.err(err)
				reject()
			} else {
				resolve(1)
			}
		})
	}).catch((e) => {
		console.log(e)
	})
}
