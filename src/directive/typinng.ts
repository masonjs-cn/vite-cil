/*
 * @Author: Deivo
 * @Date: 2021-11-23 15:18:03
 * @LastEditors: Deivo
 * @LastEditTime: 2021-11-23 15:24:42
 * @FilePath: /eapp-web-system/src/directive/typinng.ts
 */
import { App, ObjectDirective } from 'vue'

export interface IDirectiveOptionWithInstall extends ObjectDirective {
  install?: (app: App) => void
}
