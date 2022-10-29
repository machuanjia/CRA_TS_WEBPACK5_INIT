/*
 * @Author: D.Y.M
 * @Date: 2021-10-21 17:06:46
 * @LastEditTime: 2022-10-14 17:16:05
 * @FilePath: /main/src/layouts/Nav/index.tsx
 * @Description:
 */

// import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { Menu } from 'antd'
import { Icon, Text } from 'otter-pro'
import i18n from 'otter-pro/es/i18n'
import { useNavigate } from 'react-router-dom'

import { usePermission } from '@/hooks'
import { useAppModel, useGlobalModel } from '@/models'
import { permissionTreeFilter } from '@/utils'

import { MainContext } from '../context'
import styles from './index.module.less'

const { SubMenu } = Menu

const navList = [
  {
    path: '/dashboard',
    meta: {
      key: 'Dashboard',
      name: i18n.t('routes.dashboard'),
      icon: <Icon name="dashboard" />,
      permission: 'dashboard*',
    },
  },
  {
    path: '/data',
    meta: {
      key: 'otterData',
      name: i18n.t('routes.data'),
      container: 'otterData',
      icon: <Icon name="data" />,
      permission: 'data*',
    },
    children: [
      {
        path: '/data/lake',
        meta: {
          key: 'otterDataLake',
          name: '数据湖',
          container: 'otterData',
          icon: <Icon name="lake" />,
          permission: 'lake*',
        },
      },
      {
        path: '/data/sets',
        meta: {
          key: 'otterDataSet',
          name: i18n.t('routes.dataSet'),
          container: 'otterData',
          icon: <Icon name="set" />,
          permission: 'set*',
        },
      },
      {
        path: '/data/tasks',
        meta: {
          key: 'otterDataTasks',
          name: i18n.t('routes.dataTask'),
          container: 'otterData',
          icon: <Icon name="annotations" />,
          permission: 'task*',
        },
      },
      {
        path: '/data/synthesis',
        meta: {
          key: 'otterDataSynthesis',
          name: i18n.t('routes.dataSynthesis'),
          container: 'otterData',
          icon: <Icon name="synthesis" />,
          permission: 'synthesis*',
        },
      },
    ],
  },
  {
    path: '/experiment',
    meta: {
      key: 'Experiment',
      name: '实验',
      icon: <Icon name="experiment" />,
      permission: 'experiment*',
    },
    children: [
      {
        path: '/experiment/training',
        meta: {
          key: 'trainingTasks',
          container: 'otterExperiment',
          name: '训练任务',
          icon: <Icon name="training" />,
          permission: 'experiment*',
        },
      },
    ],
  },
  {
    path: '/model',
    meta: {
      key: 'Model',
      name: '模型',
      container: 'otterModel',
      icon: <Icon name="model" />,
      permission: 'model*',
    },
    children: [
      {
        path: '/model/repo',
        meta: {
          key: 'MM',
          container: 'otterModel',
          name: '模型仓库',
          icon: <Icon name="mw" />,
          permission: 'modelDepot*',
        },
      },
    ],
  },
  {
    path: '/test',
    meta: {
      key: 'Test',
      name: '测试',
      icon: <Icon name="test" />,
      permission: 'test*',
    },
    children: [
      {
        path: '/test/tasks',
        meta: {
          key: 'index',
          container: 'otterTest',
          name: '测试任务',
          icon: <Icon name="mw" />,
          permission: 'test*',
        },
      },
      {
        path: '/test/tasks/task_analysis',
        meta: {
          key: 'TaskAnalysis',
          container: 'otterTest',
          name: '测试任务效果分析',
          icon: <Icon name="mw" />,
          permission: 'test*',
        },
      },
      {
        path: '/test/tasks/dataset_analysis',
        meta: {
          key: 'DatasetAnalysis',
          container: 'otterTest',
          name: '数据集效果分析',
          icon: <Icon name="mw" />,
          permission: 'test*',
        },
      },
    ],
  },
  {
    path: '/publish',
    meta: {
      key: 'Publish',
      name: '发布',
      icon: <Icon name="publish" />,
      permission: 'publish*',
    },
  },
  {
    path: '/percipience',
    meta: {
      key: 'Percipience',
      name: '洞察',
      icon: <Icon name="penetrate" />,
      permission: 'percipience*',
    },
  },
  {
    path: '/setting',
    meta: {
      key: 'Setting',
      name: '配置中心',
      icon: <Icon name="setting" />,
      permission: 'project.setting*',
    },
    children: [
      {
        path: '/engine',
        meta: {
          key: 'Settings',
          name: 'AI 引擎',
          icon: <Icon name="engine" />,
          permission: 'aiEngine*',
        },
      },
      {
        path: '/capability',
        meta: {
          key: 'Capability',
          name: 'AI 能力',
          icon: <Icon name="ai-capability" />,
          permission: 'aiCapacity*',
        },
      },
    ],
  },
]

const Nav = () => {
  const { currentRoute, permissions } = useAppModel()
  const history = useNavigate()
  const { projectId } = useGlobalModel()
  const [navs, setNavs] = useState([])
  const [isHasPermission] = usePermission()
  const { isCollapsed } = useContext(MainContext)
  const selectNav = (item) => {
    history(`/projects/${projectId}${item.path}`)
  }

  useEffect(() => {
    setNavs(permissionTreeFilter(navList, isHasPermission))
  }, [permissions])

  const getMenu = (menus) => {
    return menus.map((item) => {
      if (item?.children && item?.children.length > 0) {
        return (
          <SubMenu
            key={item?.meta.key}
            title={
              <>
                <Text type="info">{item?.meta.icon}</Text>
                <span className={`${styles['nav-text']} ml-2`}>{item?.meta.name}</span>
              </>
            }
          >
            {getMenu(item?.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={item?.meta.key} title={item?.meta.name}>
          <a
            onClick={() => {
              selectNav(item)
            }}
            className=" flex items-center"
          >
            <Text type="info">{item?.meta.icon}</Text>
            <span className={`${styles['nav-text']} ml-2`}>{item?.meta.name}</span>
          </a>
        </Menu.Item>
      )
    })
    return []
  }

  return (
    <Menu
      selectedKeys={[currentRoute?.meta?.key]}
      inlineCollapsed={isCollapsed}
      mode="inline"
      className={`${styles.nav} ${isCollapsed && styles['nav-collapsed']}`}
    >
      {navs.length > 0 && getMenu(navs)}
    </Menu>
  )
}

export default Nav
