/*
 * @Author: D.Y
 * @Date: 2021-01-07 10:05:34
 * @LastEditTime: 2022-08-15 11:04:40
 * @LastEditors: lubenben
 * @FilePath: /main/src/utils/request.ts
 * @Description: http
 */

import { message } from 'antd'
import { getRequest, login } from 'otter-pro/es/utils'

let TIME_NOW: any = null

export default getRequest({
  baseURL: process.env.REACT_APP_API,
  timeout: 30000,
  responseAction: (res: any) => {
    return res.data
  },
  responseErrorAction: (res) => {
    // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
    let messageText = ''
    let haveMessage = true
    let hasLogin = false
    let replaceMessage = true
    switch (res.response.data.code) {
      case 1:
        messageText = '请求超时!'
        break
      case 2:
        messageText = '服务器繁忙，请刷新重试!'
        break
      case 3:
        messageText = '请求错误, 请重试!'
        break
      case 4:
        messageText = '网关超时!'
        break
      case 5:
        messageText = '资源未找到!'
        if (res.response.data.details && res.response.data.details[0].metadata.code === '20000') {
          haveMessage = false
        }
        break
      case 6:
        break
      case 7:
        messageText = '登录过期,正在跳转登录!'
        if (res.response.data.details && res.response.data.details[0].metadata.code === '10000') {
          hasLogin = true
          haveMessage = false
          replaceMessage = false
        }
        break
      case 8:
        messageText = '资源冲突!'
        break
      case 10:
        messageText = '资源冲突!'
        break
      case 11:
        messageText = '请求错误, 请重试!'
        break
      case 12:
        messageText = '服务器不认识这个请求!'
        break
      case 13:
        messageText = '服务器繁忙，请刷新重试!'
        break
      case 14:
        messageText = '当前访问人数太多, 请刷新重试!'
        break
      case 15:
        messageText = '服务器繁忙，请刷新重试!'
        break
      case 16:
        messageText = '无访问权限!'
        break
      default:
        break
    }
    if (res.response.data.message && replaceMessage) {
      messageText = res.response.data.message
    }
    // @ts-ignore
    if (haveMessage && (TIME_NOW ? new Date() - TIME_NOW > 5000 : true)) {
      message.error(messageText)
      TIME_NOW = new Date()
    }
    if (hasLogin) {
      login()
    }
    return Promise.reject(res.response.data)
  },
})
