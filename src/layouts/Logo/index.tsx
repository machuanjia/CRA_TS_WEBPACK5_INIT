/*
 * @Author: D.Y.M
 * @Date: 2021-10-21 14:53:55
 * @LastEditTime: 2022-06-10 16:02:38
 * @FilePath: /main/src/layouts/Logo/index.tsx
 * @Description:
 */

import { useContext } from 'react'

import logo from '@/assets/logo.png'

import { MainContext } from '../context'


const Logo = () => {
  const {isCollapsed} = useContext(MainContext)
  return <div className=" box-border h-14 flex justify-center items-center border-b border-medium w-full h-12"><img className=" w-7 h-7" src={logo} /> { !isCollapsed && <span className=' text-lg ml-1 text-medium'>MLPLATFORM</span>}</div>
}

export default Logo
