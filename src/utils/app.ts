import { map } from 'lodash'

import { appPaths } from '@/routes/async'

export const showAppLoading = () => {
  document.getElementById('global-loading').style.display = 'flex'
}

export const hideAppLoading = () => {
  document.getElementById('global-loading').style.display = 'none'
}

export const toogleAppClass = (flag: boolean, className: string) => {
  const containers = [
    'otter',
    'otterData',
    'otterExperiment',
    'otterModel',
    'otterTest',
    'otterPublish',
  ]
  containers.map((id: string) => {
    const classNames = document.getElementById(id).classList
    classNames.toggle(className, flag)
  })
}

export const AppRegisterUtil = {
  main: 'otter',
  containers: {
    'laiye-ml-data': 'otterData',
    'laiye-ml-experiment': 'otterExperiment',
    'laiye-ml-model': 'otterModel',
    'laiye-ml-test': 'otterTest',
    'laiye-ml-publish': 'otterPublish',
  },
  beforeMount: (name) => {
    showAppLoading()
    localStorage.setItem('activeApp', name)
  },
  afterMount: () => {
    hideAppLoading()
    AppRegisterUtil.toogleApp()
  },
  afterUnMount: () => {
    localStorage.removeItem('activeApp')
    AppRegisterUtil.toogleApp()
  },
  toogleApp: () => {
    const name = localStorage.getItem('activeApp')
    const isCollapsed = localStorage.getItem('isCollapsed') === 'false' && 'app-wrap-open'
    const isStep = localStorage.getItem('isStepVisible') === 'true' && 'app-wrap-step'
    if (AppRegisterUtil.containers[name]) {
      document.getElementById(AppRegisterUtil.main).className = `app-wrap hidden`

      map(AppRegisterUtil.containers, (n, k) => {
        if (k === name) {
          document.getElementById(
            AppRegisterUtil.containers[name],
          ).className = `app-wrap ${isCollapsed} ${isStep}`
        } else {
          document.getElementById(n).className = `app-wrap ${isCollapsed} ${isStep} hidden`
        }
      })
    } else {
      document.getElementById(AppRegisterUtil.main).className = `app-wrap ${isCollapsed} ${isStep}`
      map(AppRegisterUtil.containers, (n) => {
        document.getElementById(n).className = 'app-wrap hidden'
      })
    }
  },
}

export const getLocation = (path: string, projects) => {
  const project = localStorage.getItem('activeProject')
  // 如果没有上次选中的项目，则直接跳转到项目列表页面
  if (!project) {
    return '/projects'
  }
  const p = projects.find((n) => {
    return n.project.id === project
  })
  if (!p) {
    return '/projects'
  }
  // 跟目录
  if (path === '/') {
    return `/projects/${project}/dashboard`
  } else if (appPaths.includes(path)) {
    // 子项目
    const pa = location.pathname.split('/')
    const p = projects.find((n) => {
      return n.project.id === pa[2]
    })
    if (!p) {
      return '/projects'
    }
    return location.pathname + location.search
  }
}
