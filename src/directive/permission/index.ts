/*
 * @Author: Deivo
 * @Date: 2021-11-23 15:05:11
 * @LastEditors: Mason
 * @LastEditTime: 2022-08-04 18:06:29
 * @FilePath: /vite-project/src/directive/permission/index.ts
 */
import { DirectiveBinding } from "vue";
import { IDirectiveOptionWithInstall } from "../typinng";
// import { store } from "@/store";

/**
 * @description: 权限指令
 * @param {HTMLElement} el
 * @param {DirectiveBinding} binding
 * @return {*}
 */
const checkPermission = (el: HTMLElement, binding: DirectiveBinding) => {
  const { value } = binding;
  if (value && Array.isArray(value) && value.length > 0) {
    const hasPermissions = isHasPermissions(value);
    if (!hasPermissions) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error("权限标签值不能为空");
  }
};

/**
 * @description 是否有权限
 * @param {string[]} value
 * @return {*}
 */
export const isHasPermissions = (value: string[]): boolean => {
  // return permissions.some((permission: string) => value.includes(permission))
  return true;
};

const plugin = (el: HTMLElement, binding: DirectiveBinding) => {
  checkPermission(el, binding);
};
export default plugin as IDirectiveOptionWithInstall;
