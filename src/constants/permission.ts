/*
 * @Author: D.Y.M
 * @Date: 2022-04-27 14:49:28
 * @LastEditTime: 2022-08-12 11:00:10
 * @FilePath: /main/src/constants/permission.ts
 * @Description:
 */
import { keyBy, map } from 'lodash'

// 一级、二级菜单
const permissionMenu = [
  {
    id: 'uNrat4HzrOX505QeKNBbvQPzlngzZ9q_',
    key: 'dashboard*',
    name: '概览',
  },
  {
    id: 'dPHNXJ6ieFR6WMqaejl6GDngBd_yLX3m',
    key: 'project*',
    name: '项目管理',
  },
  {
    id: '4WuAM3wykm6nnLETVdVE9wtJA18WK8VN',
    key: 'data*',
    name: '数据',
  },
  {
    id: 'Lg5Qw0rYgKDywNYCGPQhiFDFjjaTwrbY',
    key: 'lake*',
    name: '数据湖',
  },
  {
    id: 'mxyGZs20UC7ZBsn0kBqgzuVkMtoHWQEN',
    key: 'set*',
    name: '数据集',
  },
  {
    id: 'g-PeVcQUZp2A6mNL_QANAFR_SHAw5CJW',
    key: 'task*',
    name: '标注任务',
  },
  {
    id: 'BO7i9iWC9zoCu8S9Cjk4urCcN33nCzjq',
    key: 'synthesis*',
    name: '数据合成',
  },
  {
    id: 'EFq5hQ1hvhuyZJCW57CWMVNapBkrQ7hS',
    key: 'compute*',
    name: '算力',
  },
  {
    id: 'OXyL57H_FohyZNd8IQXeFqjB-MLvw10d',
    key: 'computeContainer*',
    name: '算力容器',
  },
  {
    id: 'w1ApF326YLfZkO76BMq8RKWDj-Ldo-3Y',
    key: 'computeResource*',
    name: '计算资源',
  },
  {
    id: 'u55mN_CQ7nDch95UhtSHOHn1trnK3v3B',
    key: 'experiment*',
    name: '实验',
  },
  {
    id: 'eZzuYyanaqZt9zwmD1Y5Sz4oBW274KTT',
    key: 'model*',
    name: '模型',
  },
  {
    id: '-uHjaM_50UK9q4hC6jsoyFUnYsF4P1uo',
    key: 'modelDepot*',
    name: '模型仓库',
  },
  {
    id: 'Fu5vDxTFh2fWeM6USUGBsCtPpPdnJHqK',
    key: 'modelMarket*',
    name: '模型市场',
  },
  {
    id: 'LOZGUue1DCd58NRzMmD0eLR8ee9wL84G',
    key: 'modelWorking*',
    name: '模型加工',
  },
  {
    id: 'Wr8M-UBv2PHLxEWQXB_38-rJ4A27clW_',
    key: 'service*',
    name: '服务',
  },
  {
    id: 'sSHcMswxCz5wzEZAo2ruXCg6_IIjMK0c',
    key: 'test*',
    name: '测试',
  },
  {
    id: '0DZ-RmUf78j6RH0RaLprnrhomtLdv5ri',
    key: 'testingTask*',
    name: '测试任务',
  },
  {
    id: 'MUD5AABMJKznLurbFNM7wiqvI0wTrm59',
    key: 'TestingTaskAnalysis*',
    name: '统计分析',
  },
  {
    id: 'K7YHPyBwt0iqWBAfVDN4-WzXIjhr2_ZE',
    key: 'foresee*',
    name: '洞察',
  },
  {
    id: 'Vfe88Qc9JN4UJmHM3wf9bXsdicqYyJmD',
    key: 'project.setting*',
    name: '配置中心',
  },
  {
    id: 'zQYrCZ4NNjnC8r_9Zwg_JyZgHPPNC1J3',
    key: 'aiEngine*',
    name: '引擎管理',
  },
  {
    id: 'tzrpWN4lcg3WtIk3ZX9s5SlWobxnyA3Z',
    key: 'aiCapacity*',
    name: 'AI能力管理',
  },
]
const permissionProject = [
  {
    id: 'OQ9ZPSVH0RnmuFKK_XNWk9LtGue6o6MC',
    key: 'project.get',
    name: '获取项目',
  },
  {
    id: 'eHhL9ItVaga6606Mp6o6GWtzAlFyp01r',
    key: 'project.memberList.get',
    name: '获取项目成员列表',
  },
  {
    id: '8myBIUUfSpkJT3i2oAHFCWBL4GW-ZAyI',
    key: 'project.member.add',
    name: '添加项目成员',
  },
  {
    id: 'XKO1hvXRo68Dutg7cD8Kw9BgtVy4wl8p',
    key: 'project.memberRole.modify',
    name: '修改项目成员角色',
  },
  {
    id: '_SnXmh6jcWpYh2kk6xLzvunl1tZeHCYx',
    key: 'project.member.delete',
    name: '删除项目成员',
  },
  {
    id: 'OJ_Q3bKLq_22yq5dMvLJxLV8Nsbkde1M',
    key: 'project.engine.list',
    name: '获取引擎管理列表',
  },
  {
    id: 'sPL6BwcFeMIxYh8c8W5fy-V3driBKvPw',
    key: 'project.engine.create',
    name: '创建引擎',
  },
  {
    id: 'elhpkV9XANAwilUBB56Ln96E3F1KWgRp',
    key: 'project.engine.update',
    name: '更新引擎',
  },
  {
    id: 'RkXZv0BGaygQOqGuoVsKvDdjSaDQFCf4',
    key: 'project.engine.delete',
    name: '删除引擎',
  },
  {
    id: 'hDzdgcGUZHQmK_Ad1lDr5MgHqy2euud9',
    key: 'project.capacity.list',
    name: '获取AI能力管理列表',
  },
  {
    id: '4VxAQmy7B04HOpEXOlh0iRfcksirnNPv',
    key: 'project.capacity.detail',
    name: '获取AI能力详情',
  },
  {
    id: '_C56XMGPezy9zbTRtNdX4kfQPEW3uUSD',
    key: 'project.capacity.create',
    name: '创建AI能力',
  },
  {
    id: '0IwH463-8QlFMq1ll2VqfL_q6Wc9onXz',
    key: 'project.capacity.update',
    name: '更新AI能力',
  },
  {
    id: '9vYpwNlfhcNGK9uHtitu1l4ZX8uyKH4w',
    key: 'project.capacity.archive',
    name: '归档AI能力',
  },
  {
    id: 'ASJCb_WNrAG4PQ5Zm2KqlMppl2qDvD4L',
    key: 'project.capacity.unArchive',
    name: '取消归档AI能力',
  },
  {
    id: '8vLevVawZq7vvozwyC1jrYUr6vUNZt2h',
    key: 'project.capacity.download',
    name: '下载AI能力',
  },
  {
    id: 'OFAl5btOXoedXpVcY70koi4YuxUfcgfb',
    key: 'project.capacity.upload',
    name: '上传AI能力',
  },
  {
    id: 'VX7TobvUggEr3GCBGUiKxCtfusqelVkR',
    key: 'project.capacity.tag.list',
    name: '获取AI能力数据集标签列表',
  },
  {
    id: 'Vpys7TDsOyC7C8OgPYJ1QiOBB0nmFmx6',
    key: 'project.capacity.tag.create',
    name: '创建AI能力数据集标签',
  },
  {
    id: '2Zirux79PW1tQh0bstqlYMarnXTqwqSL',
    key: 'project.capacity.tag.delete',
    name: '删除AI能力数据集标签列表',
  },
  {
    id: 'Rb9xax0LzQq_b_x6ut1iVSVOra88gDUs',
    key: 'project.capacity.template.list',
    name: '获取标注模板列表',
  },
  {
    id: 'EbLs5doCacSMo4tlUunAl1eONQdtYnZe',
    key: 'project.capacity.template.latest',
    name: '获取最新标注模板',
  },
  {
    id: 'mVfkKjw3owJfu9NlQzalW2SLcVWvK6IW',
    key: 'project.capacity.template.detail',
    name: '获取标注模板详情',
  },
  {
    id: '4KctmrEFC_777feJp56SFRogujlHcsQC',
    key: 'project.capacity.template.create',
    name: '创建标注模板',
  },
  {
    id: 'k24p52jTMEm5RaCWupczhHAkNV17GJnk',
    key: 'project.capacity.allowAnnotation.get',
    name: '获取AI能力允许的标注格式',
  },
  {
    id: 'wQkr1HFS4MAZo6g3friPIoGwOa3fDRpE',
    key: 'project.capacity.engine.get',
    name: '获取AI能力支持的引擎列表',
  },
  {
    id: 'vWLftTaFhwt4EoAEneImAZgvkJGXZVA3',
    key: 'project.capacity.defaultDataset.list',
    name: '获取默认数据集列表',
  },
  {
    id: '7qthVYvySzl80pIw0O9VPuCJSqRg2Iw3',
    key: 'project.capacity.defaultDataset.add',
    name: '添加默认数据集',
  },
  {
    id: 'K1v2mgVk3vl2qMEoAKK081XqFWX9YlHD',
    key: 'project.capacity.defaultDataset.delete',
    name: '删除默认数据集',
  },
]
const permissionSet = [
  {
    id: 'y2IIRwSaOfwFxm5XN6N_WS-0-AWTgY9K',
    key: 'set.list.get',
    name: '获取数据集列表',
  },
  {
    id: 'liP8SdDQH2ba94DE2gksmB0FmndRhjTX',
    key: 'set.list.view',
    name: '查看数据集',
  },
  {
    id: 'JsFTWVQE12U2WA_N3U_ggzM1woafCIIT',
    key: 'set.create',
    name: '创建数据集',
  },
  {
    id: '24Yu34gNEon-_CBkG_k_TQeAx7UHVMvZ',
    key: 'set.update',
    name: '更新数据集',
  },
  {
    id: '1dpA0NXOlueE5CWH5Q85UNoCZxTkr2L3',
    key: 'set.delete',
    name: '删除数据集',
  },
  {
    id: '04NW_wobCNQyTntBmVNE8ts-2W00kE2-',
    key: 'set.fork',
    name: '复制数据集',
  },
  {
    id: 'MYuEg0VNTEsel74KOI854bz8xdcIAP4O',
    key: 'set.label.add',
    name: '添加标签',
  },
  {
    id: 'vK6J6UI348dVR7lrKZiyOnOmexBx1VKC',
    key: 'set.label.delete',
    name: '删除标签',
  },
  {
    id: 'elFNcbk8T0sKf-f-HZ8F2dOyubANCbsD',
    key: 'set.version.list.get',
    name: '获取版本列表',
  },
  {
    id: 'E32mlb3Arb0bgllfJKJpZo8ISPEEwSwU',
    key: 'set.version.detail',
    name: '获取版本详情',
  },
  {
    id: 'ghX_mbIJLw9K_noLuzsikl6eSWUtCuBg',
    key: 'set.version.create',
    name: '创建版本',
  },
  {
    id: 'dPUoFgCkH_K1zWmpb2pKul53QSdrX7o7',
    key: 'set.dirs.get',
    name: '获取目录列表',
  },
  {
    id: 'xfqnn_E5LiVWdSONRA6ncSIhi49n5Vx5',
    key: 'set.dir.create',
    name: '创建目录',
  },
  {
    id: '4RAWQge1o27co3Tjl0zJ3JqGoM3rdnAX',
    key: 'set.dir.update',
    name: '修改目录',
  },
  {
    id: '5U4HrJWwPc0Vd7CoxNv4qRxrXRtqDQo-',
    key: 'set.dir.delete',
    name: '删除目录',
  },
  {
    id: '91r-JMONaMtbwkgKoz8WU08qlYroMONs',
    key: 'set.dir.download',
    name: '下载目录',
  },
  {
    id: 'toEp9HrgKVv3KDzIQn7zR2u0gH5Ley1X',
    key: 'data.list.get',
    name: '获取数据列表',
  },
  {
    id: 'tYui4sygy3ImmIdeMophhlYYp-gWtzyy',
    key: 'set.data.batchCreate',
    name: '批量创建数据',
  },
  {
    id: '7fmSLo5AtvNKBSRMxj_cN3aDTECVIlGc',
    key: 'set.data.batchDownload',
    name: '批量下载数据',
  },
  {
    id: 'rM4LnwOmWJVJCpgXImpcDKuI5VN-pzgU',
    key: 'set.data.batchDelete',
    name: '批量删除数据',
  },
  {
    id: 'd54UuFycDqkC0gXWQQfmuYhxilRLn-lK',
    key: 'set.data.batchMove',
    name: '批量移动数据',
  },
  {
    id: 'HGBVS04LZxctOFK9sJDflDvf70EpmNC-',
    key: 'set.data.edit',
    name: '编辑数据',
  },
]
const permissionAnnotationTask = [
  {
    id: 'bnVK7LTFLKoIDPbjXlzfpbQRG5yO3UDZ',
    key: 'task.annotation',
    name: '标注',
  },
  {
    id: 'h_7X7wVw2sFb3gbZT8gLZ6ZIKJMzPUBd',
    key: 'task.inspection',
    name: '质检',
  },
  {
    id: 'EPgtOQZT6Ox3mVVPZp1xcXV37CRdLbVB',
    key: 'task.acceptance',
    name: '验收',
  },
  {
    id: 'lGj15cQg6sz-7zwcwQgf4fdEAmMIXSgg',
    key: 'task.list.get',
    name: '获取标注任务列表',
  },
  {
    id: 'ojRJuIo7GRmrKd60ax-2c-jCo6tv0Kh2',
    key: 'task.create',
    name: '创建标注任务',
  },
  {
    id: 'YdihKmMEsJHkmFwyxSwb0PQkqj7AOsMV',
    key: 'task.update',
    name: '更新标注任务',
  },
  {
    id: '87FPJ0zzcQnFGDWKnEXlkBqU-28kf_xy',
    key: 'task.roles.get',
    name: '获取标注任务角色列表',
  },
  {
    id: 'ypu8gAyvEhSAonjUNdb-fNg2u7vyoOPB',
    key: 'task.role.add',
    name: '添加标注任务角色',
  },
  {
    id: '7oA52pHYI7GmgvybOSeFqrnYOHUlnOiN',
    key: 'task.role.addManage',
    name: '添加标注任务管理员',
  },
  {
    id: 'oYAWG1KbhUPjjrPCMWRtuBqT8dNKn1eP',
    key: 'task.role.delete',
    name: '删除标注任务角色',
  },
  {
    id: 'athY3qJTew9I6GC9NI5vD4LHJiG-5V4T',
    key: 'task.delete',
    name: '删除标注任务',
  },
  {
    id: 'ICDnGQ69nMp6rVvDox8wuoxR1XRBsK9x',
    key: 'task.stop',
    name: '停止标注任务',
  },
  {
    id: 'OxKK0mobXUcLAeoizsfRpbu2u8FcLNz4',
    key: 'task.result.submitAll',
    name: '提交所有标注结果',
  },
  {
    id: 'u8EVRZfWm7dD9Jds0vW56BF_2DVWFwhY',
    key: 'synthesis.list',
    name: '获取任务列表',
  },
  {
    id: 'ht8LkiqYHqUY3zPSo_co89d6doAwEqwI',
    key: 'synthesis.create',
    name: '创建任务',
  },
  {
    id: '3P6MihntY4Vo7R338DLyLiSFQUojcFLX',
    key: 'synthesis.start',
    name: '开始任务',
  },
  {
    id: 'hIMqs_eSTwetQPw6wghm81Z31JcZQ_vm',
    key: 'synthesis.stop',
    name: '停止任务',
  },
  {
    id: 'POel1a7nd3e65R_mtzjlGp2RtsiGX32E',
    key: 'synthesis.delete',
    name: '删除任务',
  },
]

export const permissionsList = [
  ...permissionMenu,
  ...permissionProject,
  ...permissionSet,
  ...permissionAnnotationTask,
]
export const routePermissions = map(permissionsList, 'key')

export const permissionsListMap = keyBy(permissionsList, 'key')

export const permissionsListIdMap = keyBy(permissionsList, 'id')
