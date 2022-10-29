/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 15:49:54
 * @LastEditTime: 2022-03-02 15:05:47
 * @FilePath: /main/src/routes/static.tsx
 * @Description:
 */
import { lazy } from 'react'

import i18n from 'i18next'
import { LazyLoad } from 'otter-pro'

import asyncRoute from './async'

const Login = lazy(() => import('@/views/Login'))

const Logout  = lazy(() => import('@/views/Logout'))

const Main = lazy(() => import('@/layouts/Main'))

const routes = [
  {
    path: '/login',
    meta: {
      key: 'Login',
      name: i18n.t('router.login'),
      isHidden: true,
    },
    element: LazyLoad(<Login/>),
  },
  {
    path: '/logout',
    meta: {
      key: 'Login',
      name: i18n.t('router.login'),
      isHidden: true,
    },
    element: LazyLoad(<Logout/>),
  },
  {
    path: '/',
    meta: {
      key: 'Main',
      name: i18n.t('router.main'),
      isHidden: true,
    },
    element: LazyLoad(<Main/>),
    children: asyncRoute,
  },
]

export default routes
