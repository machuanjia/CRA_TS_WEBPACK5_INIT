/*
 * @Author: D.Y.M
 * @Date: 2021-10-20 16:12:45
 * @LastEditTime: 2022-08-07 10:55:21
 * @FilePath: /main/src/routes/async.tsx
 * @Description:
 */
import { lazy } from 'react'

import { Icon, LazyLoad } from 'otter-pro'
import i18n from 'otter-pro/es/i18n'

const Team = lazy(() => import('@/views/Team'))

const Project = lazy(() => import('@/views/Project/index'))

const ProjectList = lazy(() => import('@/views/Project/List'))

const ProjectDetail = lazy(() => import('@/views/Project/Detail'))

const ProjectEngine = lazy(() => import('@/views/Project/engine'))

const ProjectCapability = lazy(() => import('@/views/Project/capability'))

const ProjectCapabilityList = lazy(() => import('@/views/Project/capability/List'))

const ProjectCapabilityDetail = lazy(() => import('@/views/Project/capability/detail/index'))

const ProjectCapabilityDetailBasicInfo = lazy(
  () => import('@/views/Project/capability/detail/BasicInfo'),
)

const ProjectCapabilityDetailTag = lazy(() => import('@/views/Project/capability/detail/Tag'))

const ProjectCapabilityDetailTemplate = lazy(
  () => import('@/views/Project/capability/detail/TemplateList'),
)

const ProjectCapabilityDetailDataset = lazy(
  () => import('@/views/Project/capability/detail/DefaultDataset'),
)

const Dashboard = lazy(() => import('@/views/Dashboard'))

const App = lazy(() => import('@/views/App'))

const routes = [
  {
    path: 'teams',
    meta: {
      key: 'Team',
      name: i18n.t('routes.team'),
      icon: <Icon name="team" />,
    },
    element: LazyLoad(<Team />),
  },
  {
    path: 'projects',
    meta: {
      key: 'Project',
      name: i18n.t('routes.project'),
      icon: <Icon name="project" />,
    },
    element: LazyLoad(<Project />),
    children: [
      {
        path: '',
        meta: {
          key: 'Project',
          name: i18n.t('routes.project'),
          icon: <Icon name="project" />,
        },
        element: LazyLoad(<ProjectList />),
      },
      {
        path: ':id',
        meta: {
          key: 'Project',
          name: i18n.t('routes.project'),
          icon: <Icon name="project" />,
        },
        element: LazyLoad(<ProjectDetail />),
        children: [
          {
            path: 'engine',
            meta: {
              key: 'Engine',
              name: '引擎管理',
              icon: <Icon name="engine" />,
            },
            element: LazyLoad(<ProjectEngine />),
          },
          {
            path: 'capability',
            meta: {
              key: 'Capability',
              name: 'AI能力管理',
              icon: <Icon name="ai-capability" />,
            },
            element: LazyLoad(<ProjectCapability />),
            children: [
              {
                path: '',
                meta: {
                  key: 'CapabilityList',
                  name: 'AI能力管理',
                  icon: <Icon name="ai-capability" />,
                },
                element: LazyLoad(<ProjectCapabilityList />),
              },
              {
                path: ':capabilityId',
                meta: {
                  key: 'CapabilityDetail',
                  name: i18n.t('routes.dataSet'),
                  icon: <Icon name="set" />,
                  isFullPath: true,
                },
                element: LazyLoad(<ProjectCapabilityDetail />),
                children: [
                  {
                    path: 'basic',
                    meta: {
                      key: 'BasicInfo',
                      name: '基础信息',
                      icon: <Icon name="setting" />,
                      isFullPath: true,
                    },
                    element: LazyLoad(<ProjectCapabilityDetailBasicInfo />),
                  },
                  {
                    path: 'tag',
                    meta: {
                      key: 'DatasetTag',
                      name: '数据集标签',
                      icon: <Icon name="setting" />,
                      isFullPath: true,
                    },
                    element: LazyLoad(<ProjectCapabilityDetailTag />),
                  },
                  {
                    path: 'template',
                    meta: {
                      key: 'AnnotationTemplate',
                      name: '标注模板',
                      icon: <Icon name="setting" />,
                      isFullPath: true,
                    },
                    element: LazyLoad(<ProjectCapabilityDetailTemplate />),
                  },
                  {
                    path: 'dataset',
                    meta: {
                      key: 'defaultDataset',
                      name: '默认数据集',
                      icon: <Icon name="setting" />,
                      isFullPath: true,
                    },
                    element: LazyLoad(<ProjectCapabilityDetailDataset />),
                  },
                ],
              },
            ],
          },
          {
            path: 'dashboard',
            meta: {
              key: 'Dashboard',
              name: i18n.t('routes.dashboard'),
              icon: <Icon name="dashboard" />,
              permission: 'dashboard*',
            },
            element: LazyLoad(<Dashboard />),
          },
          {
            path: 'data/*',
            element: LazyLoad(<App />),
            meta: {
              key: 'otterData',
              name: i18n.t('routes.data'),
              container: 'otterData',
              icon: <Icon name="data" />,
              permission: 'data*',
            }
          },
          {
            path: 'experiment/*',
            meta: {
              key: 'Experiment',
              name: '实验',
              container: 'otterExperiment',
              icon: <Icon name="experiment" />,
              permission: 'experiment*',
            },
            element: LazyLoad(<App />)
          },
          {
            path: 'model/*',
            meta: {
              key: 'Model',
              name: '模型',
              container: 'otterModel',
              icon: <Icon name="model" />,
            },
            element: LazyLoad(<App />)
          },
          {
            path: 'test/*',
            meta: {
              key: 'Test',
              name: '测试',
              container: 'otterTest',
              icon: <Icon name="test" />,
              permission: 'test*',
            },
            element: LazyLoad(<App />)
          },
        ],
      },
    ],
  },
]

export const appPaths = ['data/*', 'experiment/*', 'model/*','test/*']

export default routes
