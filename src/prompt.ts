import inquirer from 'inquirer'

export const chooseTemplate = async () => {
    const { template } = await inquirer.prompt([
        {
            name: 'template',
            type: 'list',
            message: '请选择模板类型',
            choices: [
                {
                    name: 'thin',
                    checked: true
                },
                {
                    name: 'i18n'
                },
                {
                    name: 'tauri'
                },
                {
                    name: 'electron'
                },
                {
                    name: 'admin'
                }
            ]
        }
    ])
    return template
}

export const inputProjectName = async () => {
    const { projectName } = await inquirer.prompt([
        {
            name: 'projectName',
            type: 'input',
            message: '请输入项目名称'
        }
    ])
    return projectName
}

export const isOverwriteDir = async () => {
    const { isOverwrite } = await inquirer.prompt([
        // 返回值为promise
        {
            name: 'isOverwrite', // 与返回值对应
            type: 'list', // list 类型
            message: '目标文件已存在, 请选择一个操作',
            choices: [
                { name: '覆盖', value: true },
                { name: '取消', value: false }
            ]
        }
    ])
    return isOverwrite
}