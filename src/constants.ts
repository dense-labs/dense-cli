import type {ITemplates} from './types'

export const register = {
	npm: 'https://registry.npmjs.org/',
	taobao: 'https://registry.npmmirror.com/'
}

export {version, cliname} from '../package.json'

export const templates: ITemplates = {
	tool: {
		downloadUrl: 'github:dense-labs/tool-template', // 模板下载地址
		description: 'tool工具', // 模板描述
		branch: 'main' // 分支
	},
	componetns: {
		downloadUrl: 'github:dense-labs/componetns-template', // 模板下载地址
		description: 'componetns组建',
		branch: 'main'
	},
	monorepo: {
		downloadUrl: 'github:dense-labs/monorepo-template', // 模板下载地址
		description: 'monorepo多包管理',
		branch: 'main'
	}
}
