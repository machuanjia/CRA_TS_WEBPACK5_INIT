import React, { useEffect, useState } from 'react'

import { CheckOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, List, message, Select } from 'antd'
import { debounce } from 'lodash'
import { Text } from 'otter-pro'
import { useDeleteConfirm } from 'otter-pro/es/hooks'

import { useAppModel } from '@/models'

import styles from './index.module.less'

const { Option } = Select

interface Team {
  teamId: string
  roleId?: string
}

const SelectTeam = (props: {
  // 搜索
  onSearch: (searchText: string) => Promise<any[]>
  // 加载更多
  onLoadMore: (payload: { page: number; page_size: number }) => Promise<any[]>
  // 添加
  onAdd: (payload: Team) => Promise<any[]>
  onUpdate: (permissionId: string, roleId: string) => Promise<any[]>
  // 删除
  onDelete: (teamId: string) => Promise<any[]>
  // 权限列表
  rolesList?: any[]
}) => {
  const { onSearch, onUpdate, onLoadMore, onDelete, onAdd, rolesList } = props

  const pageSize = 5
  const { level } = useAppModel()
  const [teamsList, setTeamsList] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [DeleteConfirm] = useDeleteConfirm()
  const [hasMore, setHasMore] = useState(true)
  const [selectLoading, setSelectLoading] = useState(false)

  const getTeams = async () => {
    setLoading(true)
    const [err, data] = await onLoadMore({ page, page_size: 5 })

    if (!err) {
      const { members = [] } = data

      if (members && members.length < pageSize) setHasMore(false)

      setTeamsList((teamsList: any) => {
        teamsList.push(...members)
        return teamsList
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    getTeams()
  }, [page])

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const handleDelete = (record) => {
    const deleteTeam = async () => {
      setTeamsList((teamsList: []) => {
        teamsList.map((item: any) => {
          if (item.team.id === record.team.id) {
            item.loading = true
          }
        })

        return [...teamsList]
      })
      const [err] = await onDelete(record.id)

      if (err) {
        message.error('删除团队失败')
      } else {
        message.success('删除团队成功')
        setTeamsList(() => {
          const newArr = teamsList.filter((item) => item.id !== record.id)
          return newArr
        })
      }
    }

    DeleteConfirm({
      content: `确定要删除 ${record.team.title} 吗?`,
      handleOk: () => {
        deleteTeam()
      },
    })
  }

  const searchTeam = async (value: string) => {
    if (value) {
      setSelectLoading(true)

      const [err, data] = await onSearch(value)

      if (!err) {
        teamsList.forEach((item) => {
          if (item?.team?.id === data?.id) {
            data.disabled = true
          }
        })
        setList([data])
      } else {
        setList([])
      }

      setSelectLoading(false)
    }
  }

  const handleSearch = debounce(searchTeam, 800)

  const handleSelect = async (teamId, record) => {
    const role = rolesList.find((item) => item.title === '标注人员')
    const team = list.find((item) => item.id === teamId)
    const newTeam = {
      role,
      team: team,
      id: team.id,
      loading: true,
    }

    setTeamsList((teamsList) => {
      teamsList.push(newTeam)
      return [...teamsList]
    })

    const [err, data] = await onAdd({ teamId: record.key, roleId: role.id })

    if (!err) {
      setTeamsList((teamList = []) => {
        const newTeamsList = teamList.map((item) => (item.team.id === teamId ? data : item))

        return [...newTeamsList]
      })

      message.success('添加团队成功')
    } else {
      setTeamsList((teamList = []) => teamList.filter((item) => item.team.id !== teamId))

      message.error('添加团队失败')
    }
    setList([])
  }

  const handleBlur = () => {
    setList([])
  }

  const handleRoleChange = async (e, record) => {
    setTeamsList((teamsList: []) => {
      teamsList.map((item: any) => {
        if (item.team.id === record.team.id) {
          item.loading = true
        }
      })

      return [...teamsList]
    })

    const role_id = rolesList.find((item) => item.title === e).id

    const [err] = await onUpdate(record.id, role_id)

    if (!err) {
      message.success('更新权限成功')
    } else {
      message.error('更新权限失败, 请刷新重试')
    }

    setTeamsList((teamsList: []) => {
      teamsList.map((item: any) => {
        if (item.team.id === record.team.id) {
          item.loading = false
        }
      })

      return [...teamsList]
    })
  }

  const loadMore = (
    <div className=" flex justify-center">
      {hasMore && (
        <Button onClick={handleLoadMore} loading={loading} type="link">
          更多
        </Button>
      )}
    </div>
  )

  return (
    <>
      <List
        header={
          <Select
            className=" w-full"
            showSearch
            placeholder="请输入团队 ID 搜索团队"
            onSelect={handleSelect}
            value={null}
            loading={selectLoading}
            onSearch={handleSearch}
            onBlur={handleBlur}
            notFoundContent={null}
            filterOption={false}
            dropdownClassName="overlay-3"
          >
            {list &&
              list.map((n: any) => (
                <Option disabled={n?.disabled} key={n.id} value={n.id}>
                  <div className=" flex justify-between">
                    <div>{n.title}</div>
                    <div>{n?.disabled && <CheckOutlined style={{ color: '#348fe4' }} />}</div>
                  </div>
                </Option>
              ))}
          </Select>
        }
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={teamsList}
        locale={{ emptyText: loading ? '加载中...' : <>暂无数据</> }}
        renderItem={(item: any) => {
          const newRoleList = rolesList?.filter((item) => item.level < level)

          return (
            <List.Item key={item.id} className={styles.listItem}>
              <div className={styles.createDiv}>
                <Text type="info">{item?.team?.title}</Text>
              </div>
              <div className={styles.selectDiv}>
                {rolesList && (
                  <Select
                    style={{ width: '100%' }}
                    dropdownClassName="overlay-3"
                    defaultValue={item?.role?.title}
                    size="small"
                    disabled={item.role.level >= level}
                    onChange={(e) => handleRoleChange(e, item)}
                  >
                    {newRoleList.map((n: any) => {
                      return (
                        <Option key={n.id} value={n.title}>
                          {n.title}
                        </Option>
                      )
                    })}
                  </Select>
                )}
              </div>
              <div className={styles.loadingDiv}>{item?.loading && <LoadingOutlined />}</div>
              <div className={styles.textDiv}>
                {!item?.loading && (
                  <Text
                    className={styles.itemPrimaryLink}
                    key={item.id}
                    onClick={() => handleDelete(item)}
                    type="primaryLink"
                  >
                    {item.role.level < level && <DeleteOutlined />}
                  </Text>
                )}
              </div>
            </List.Item>
          )
        }}
      />
    </>
  )
}

export default SelectTeam
