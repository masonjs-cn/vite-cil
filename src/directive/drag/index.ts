/*
 * @Author: Mason
 * @Date: 2021-11-23 17:05:24
 * @LastEditors: Mason
 * @LastEditTime: 2021-12-21 10:59:03
 * @FilePath: /eerm-web-archives/src/directive/drag/index.ts
 */
import { ObjectDirective, App } from 'vue'

export interface IDirectiveOptionsWithInstall extends ObjectDirective {
  install?: (app: App) => void
}

const drag = (el: HTMLElement) => {
  const odiv: HTMLElement = el // 获取当前元素

  odiv.onmousedown = (e) => {
    // 算出鼠标相对元素的位置
    const disX = e.clientX - odiv.offsetLeft
    const disY = e.clientY - odiv.offsetTop

    document.onmousemove = (e) => {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = e.clientX - disX
      let bottom = document.body.offsetHeight - (e.clientY - disY) - odiv.clientHeight
      if (left < 0) {
        left = 0
      }

      if (left > document.body.offsetWidth - odiv.offsetWidth) {
        left = document.body.offsetWidth - odiv.offsetWidth
      }

      if (bottom < 0) {
        bottom = 0
      }

      if (bottom > document.body.offsetHeight - odiv.offsetHeight) {
        bottom = document.body.offsetHeight - odiv.offsetHeight
      }

      // 移动当前元素
      odiv.style.left = left + 'px'
      odiv.style.bottom = bottom + 'px'
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}

const plugin = (el: HTMLElement) => {
  drag(el)
}

export default plugin as IDirectiveOptionsWithInstall
