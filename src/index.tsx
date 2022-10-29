/*
 * @Author: D.Y.M
 * @Date: 2021-10-19 16:43:46
 * @LastEditTime: 2022-06-17 18:03:06
 * @FilePath: /mlplatform/web/main/src/index.tsx
 * @Description:
 */
import React from 'react'

import { ConfigProvider } from 'antd'
import { getAntdLocal } from 'otter-pro/es/i18n'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'

import { setResources } from '@/i18n'
import '@/styles/index.less'

import App from './App'
import reportWebVitals from './reportWebVitals'
import './register'


setResources()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={getAntdLocal()} componentSize="middle">
    <Router>
      <App />
    </Router>
  </ConfigProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
