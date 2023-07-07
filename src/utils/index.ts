import {execSync, exec} from 'child_process'
import path from 'path'
import log from './log'

/**
 * 判断是否安装了 Git
 * @returns 如果安装了 Git，则返回 true；否则，返回 false。
 */
export function hasGitInstalled(): boolean {
	try {
		// 执行 `git --version` 命令，并捕获输出
		const output = execSync('git --version')

		// 判断输出中是否包含 `git version`
		return output.toString().includes('git version')
	} catch (error) {
		// 如果执行命令时出现错误，则说明 Git 没有安装
		return false
	}
}

/**
 * 判断是否安装了 pnpm
 * @returns 如果系统中安装了 pnpm，则返回 true；否则返回 false。
 */
export function hasPnpm() {
	try {
		execSync('pnpm --version', {stdio: 'ignore'})
		return true
	} catch (err) {
		return false
	}
}

/**
 * 在指定目录下初始化 Git 仓库
 * @param repoPath - 仓库路径
 */
export function createGitRepo(repoPath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		// 执行 `cd ${repoPath} && git init` 命令
		exec(`cd ${repoPath} && git init`, (err, stdout, stderr) => {
			if (err) {
				log.err(`\nexec error: ${err}`)
				reject(err)
				return
			}
			console.log(`\nstdout: ${stdout}`)
			// 执行完成后，调用 resolve() 函数
			resolve()
		})
	})
}

/**
 * 获取指定目录的绝对路径
 * @param name - 目录名称
 * @returns 指定目录的绝对路径
 */
export function resolveDirPath(name: string): string {
	// 获取当前工作目录
	const cwd = process.cwd()
	// 当前绝对路径
	const targetDirectory = path.join(cwd, name)
	return targetDirectory
}

/**
 * 下载依赖
 * @param cwd - 执行命令时的工作目录
 */
export function installDependencies(cwd: string): void {
	console.log(cwd, 'Start installing dependencies')
	// 执行 `install`
	if (hasPnpm()) {
		execSync('pnpm install', {cwd, stdio: 'inherit'})
	} else {
		execSync('npm install', {cwd, stdio: 'inherit'})
	}
}

export function getGitRemoteUrl(): Promise<string> {
	return new Promise((resolve, reject) => {
		exec('git config --get remote.origin.url', (error, stdout, stderr) => {
			if (error) {
				reject(stderr)
			} else {
				resolve(stdout.trim())
			}
		})
	})
}
