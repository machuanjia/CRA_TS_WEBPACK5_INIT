/*
 * @Author: D.Y.M
 * @Date: 2021-10-19 16:03:39
 * @LastEditTime: 2022-05-05 14:40:46
 * @FilePath: /main/src/routes/index.tsx
 * @Description:
 */

import { useRoutes } from 'react-router-dom'

import staticRoutes from './static'

export const Routers = () => useRoutes(staticRoutes)

