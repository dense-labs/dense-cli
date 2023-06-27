import download from 'download-git-repo'
import fs from 'fs-extra'
import ora, {Ora} from 'ora'
import path from 'path'
import pc from 'picocolors'
import {Ioptions} from './types'
import {isOverwriteDir} from './prompt'
import log from './utils/log'
const spinner: Ora = ora()
/**
 * 判断指定目录是否存在
 * @param name - 目录名称
 * @param options - 选项对象，包含一个 `force` 属性，表示是否强制覆盖已有目录
 * @returns 如果目录存在，则根据选项返回相应结果；否则，返回 `false`
 */
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
export function downloadObject(url: string, path: string, opt: any) {
	return new Promise((resolve, reject) => {
		download(url, path, opt, (err: string) => {
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

export function updatePackageName(name: string, url: string) {
	return new Promise((resolve, reject) => {
		const packagePath = path.join(url, 'package.json')
		if (fs.existsSync(packagePath)) {
			try {
				// 读取 package.json 文件
				const packageData = fs.readFileSync(packagePath)
				const packageObject = JSON.parse(packageData.toString())
				// 修改 name 字段
				packageObject.name = name
				console.log(packageObject)
				// 将修改后的对象写回到文件中
				fs.writeFileSync('package.json', JSON.stringify(packageObject, null, 2))
				resolve(1)
			} catch (err) {
				log.err(err as string)
				process.exit(1)
			}
		} else {
			log.err(packagePath + 'package.json not found')
			reject()
		}
	})
}
