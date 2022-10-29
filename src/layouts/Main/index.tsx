/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 16:35:49
 * @LastEditTime: 2022-07-13 15:50:17
 * @FilePath: /main/src/layouts/Main/index.tsx
 * @Description:
 */
import React, { useEffect, useState } from 'react'

import { useRoute } from 'otter-pro/es/hooks'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAppModel, useProjectModel } from '@/models'
import { appPaths } from '@/routes/async'
import routes from '@/routes/static'
import { getLocation, toogleAppClass } from '@/utils'

import Bread from '../Bread'
import Collapser from '../Collapser'
import { MainContext } from '../context'
import Help from '../Help'
import Logo from '../Logo'
import LongrunningTasks from '../LongrunningTasks'
import Nav from '../Nav'
import Notice from '../Notice'
import Preference from '../Preference'
import Project from '../Project'
import Step from '../Step'
import styles from './index.module.less'

const Main = () => {
  const { setCurrentRoute, setBread,currentRoute } = useAppModel()
  const history = useNavigate()
  const [isStepVisible, setIsStepVisible] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isShowHeader, setIsShowHeader] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const {list,loading } = useProjectModel()
  useEffect(() => {
    setIsCollapsed(localStorage.getItem('isCollapsed') === 'true')
    toogleAppClass(localStorage.getItem('isCollapsed') !== 'true', 'app-wrap-open')

    setIsStepVisible(localStorage.getItem('isStepVisible') === 'true')
    toogleAppClass(localStorage.getItem('isStepVisible') === 'true', 'app-wrap-step')
  })
  useRoute({ routes, setCurrentRoute, setBread })


  useEffect(() => {
    if(list.length === 0 || loading || !currentRoute || loaded){
      return 
    }
    if (currentRoute.path === '/') {
      history(getLocation(currentRoute.path,list))
    }else if(appPaths.includes(currentRoute.path)){
      // 子项目
      history(getLocation(currentRoute.path,list))
    }
    setLoaded(true)
  }, [currentRoute,loading,list,history,loaded])

  return (
    <>
      <MainContext.Provider
        value={{
          isShowHeader,
          setIsShowHeader,
          isStepVisible,
          setIsStepVisible,
          isCollapsed,
          setIsCollapsed,
        }}
      >
        <section className="h-screen flex flex-row">
          <LongrunningTasks />
          <nav
            className={`${styles['main-nav']} flex flex-col items-center ${
              isCollapsed && styles['main-nav-collapse']
            }`}
          >
            <header className="flex flex-col items-center w-full">
              <Logo />
              <Collapser />
              <Project />
            </header>
            <div className=" flex-1 w-full overflow-x-hidden overflow-y-auto">
              <Nav />
            </div>
            <footer className=" flex flex-col justify-center items-center w-full">
              <Notice />
              <Help />
              <Preference />
            </footer>
          </nav>
          <div id="otter" className={`app-wrap flex flex-col ${isStepVisible && 'app-wrap-step'}`}>
            {isShowHeader && (
              <header className=" h-14 box-border flex flex-row items-center p-4 border-b border-solid border-medium">
                <Bread />
              </header>
            )}
            <div className={` flex-1 ${styles['main-body']}`}>
              <Outlet />
            </div>
          </div>
          <Step />
        </section>
      </MainContext.Provider>
    </>
  )
}
export default Main
