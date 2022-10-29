/*
 * @Author: D.Y.M
 * @Date: 2021-12-16 10:02:59
 * @LastEditTime: 2022-05-10 18:16:10
 * @FilePath: /main/server/html.js
 * @Description: 
 */
const { readFileSync } = require('fs')
const { resolve } = require('path')

function renderHtml() {

  const htmlFilePath = resolve(__dirname, '../build/index.html')

  const originalHtml = readFileSync(htmlFilePath, { encoding: 'utf8' })

  const temp = originalHtml.split('</body>')

  console.log("process env ACCOUNT_URL", process.env.ACCOUNT_URL)

  const configScript = `<script>window.config=${JSON.stringify({
    ACCOUNT_URL: process.env.ACCOUNT_URL
  })}</script>`

  const html = temp[0] + configScript + '</body>' + temp[1]

  return html
}

exports.html = renderHtml()
