/*
 * @Author: D.Y.M
 * @Date: 2021-10-19 15:27:03
 * @LastEditTime: 2021-10-19 15:27:04
 * @FilePath: /beaver/.prettierrc.js
 * @Description:
 */
const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  printWidth: 100,
}
