/*
 * @Author: D.Y.M
 * @Date: 2022-04-27 15:35:54
 * @LastEditTime: 2022-04-27 16:05:40
 * @FilePath: /main/src/utils/tool.ts
 * @Description: 
 */
export const getStateFromURl = (name) =>{
   const url = window.location.href
   const start = url.indexOf(name) + name.length + 1
   const end = url.indexOf('/',start)
   return url.substring(start, end)
}