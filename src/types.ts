export interface Ioptions {
	force: string
}

export interface ITemplatesItem {
	downloadUrl: string
	description: string
	branch: string
}

export interface ITemplates {
	tool: ITemplatesItem
	componetns: ITemplatesItem
	monorepo: ITemplatesItem
}

export type TTemplateName = 'tool' | 'componetns' | 'monorepo'

export interface IpromptItem {
	name: TTemplateName
	checked?: boolean
}
