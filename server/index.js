/*
 * @Author: D.Y.M
 * @Date: 2022-02-22 21:03:03
 * @LastEditTime: 2022-06-08 12:19:25
 * @FilePath: /main/server/index.js
 * @Description: 
 */
const express = require('express')

const { html } = require('./html')
const app = express()


/**
 * 健康检查
 */
app.get('/healthz', (_, resp) => resp.send(''))

/**
 * 静态文件服务器
 */
app.use(express.static('build'))


app.get('*', (_, res) => {
    res.send(html)
})

/**
 * 主路由
 */
app.use((_, resp) => resp.send(html))

app.listen(9080, () => console.log(`Server is running at http://127.0.0.1:9080`))
