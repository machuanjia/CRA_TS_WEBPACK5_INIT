/*
 * @Author: D.Y
 * @Date: 2021-03-29 16:11:49
 * @LastEditTime: 2022-06-21 15:50:13
 * @LastEditors: Please set LastEditors
 * @FilePath: /main/src/register.ts
 * @Description:
 */
import {registerMicroApps, start, addGlobalUncaughtErrorHandler} from 'qiankun'

import { permissionsList } from '@/constants'

import { AppRegisterUtil, checkPath } from './utils'

registerMicroApps([
  {
    name: 'laiye-ml-data',
    entry: process.env.REACT_APP_DATA_ENTRY || `${window.origin}/app/app-data/`,
    container: '#otterData',
    activeRule: (location)=> checkPath(location, 'data'),
    loader: (loading) => {
      console.log("laiye-ml-data:",loading)
    },
    props: {permissionsList}
  },
  {
    name: 'laiye-ml-model',
    entry: process.env.REACT_APP_MODEL_ENTRY || `${window.origin}/app/app-model/`,
    container: '#otterModel',
    activeRule: (location)=> checkPath(location, 'model'),
    loader: (loading) => {
      console.log("laiye-ml-model:",loading)
    },
    props: {permissionsList}
  },
  {
    name: 'laiye-ml-experiment',
    entry: process.env.REACT_APP_EXPERIMENT_ENTRY || `${window.origin}/app/app-experiment/`,
    container: '#otterExperiment',
    activeRule: (location)=> checkPath(location, 'experiment'),
    loader: (loading) => {
      console.log("laiye-ml-experiment:",loading)
    },
    props: {permissionsList}
  },
  {
    name: 'laiye-ml-test',
    entry: process.env.REACT_APP_TEST_ENTRY || `${window.origin}/app/app-test/`,
    container: '#otterTest',
    activeRule: (location)=> checkPath(location, 'test'),
    loader: (loading) => {
      console.log("laiye-ml-test:",loading)
    },
    props: {permissionsList}
  },
], {
  // @ts-ignore
  beforeLoad: (app) => {
    console.log('before load', app.name)
  },
  // @ts-ignore
  beforeMount: [(app) => {
    console.log('before mount: ', app.name)
    AppRegisterUtil.beforeMount(app.name)
  }],
  // @ts-ignore
  afterMount: [(app) => {
    console.log('after mount: ', app.name)
    AppRegisterUtil.afterMount()
  }],
  // @ts-ignore
  beforeUnmount: [(app) => {
    console.log('beforeUnmount: ', app.name)
    AppRegisterUtil.toogleApp()
  }],
  // @ts-ignore
  afterUnmount: [(app) => {
    console.log('afterUnmount: ', app.name)
    AppRegisterUtil.afterUnMount()
  }],
},)

start({
  prefetch: 'all',
  sandbox: {experimentalStyleIsolation: true}, // strictStyleIsolation
})
addGlobalUncaughtErrorHandler((event) => console.log(event))