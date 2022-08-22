/*
 * @Author: Mason
 * @Date: 2021-11-23 17:04:04
 * @LastEditors: Mason
 * @LastEditTime: 2021-11-23 17:06:22
 * @FilePath: /eerm-web-archives/src/directive/index.ts
 */
import { App } from 'vue'
import drag from './drag/index'
import permission from './permission/index'

const install = (app: App): void => {
  app.directive('drag', drag)
  app.directive('permission', permission)
}

export default install
