import React, { useEffect, useState } from 'react'

import { CheckOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, List, message, Select } from 'antd'
import { debounce } from 'lodash'
import { OtterTableFieldCreator, Text } from 'otter-pro'
import { useDeleteConfirm } from 'otter-pro/es/hooks'

import { useAppModel } from '@/models'

import styles from './index.module.less'

const { Option } = Select

interface Member {
  user_id: string
  role_id?: string
  team_id?: string
}

const SelectMember = (props: {
  title?: string
  userId?: string
  createId?: string
  // 搜索
  onSearch: (searchText: string) => Promise<any[]>
  // 加载更多
  onLoadMore: (payload: { page: number; page_size: number }) => Promise<any[]>
  // 添加
  onAdd: (payload: Member) => Promise<any[]>
  // 更新
  onUpdate?: (permissionId: string, roleId: string) => Promise<any[]>
  // 删除
  onDelete: (userId: string) => Promise<any[]>
  // 权限列表
  rolesList?: any[]
  addMember?: boolean
  listMember?: boolean
}) => {
  const {
    title,
    userId,
    addMember = true,
    listMember = true,
    onSearch,
    onLoadMore,
    onDelete,
    onAdd,
    onUpdate,
    rolesList,
    createId,
  } = props

  const { level } = useAppModel()

  const page_size = 10
  const [membersList, setMembersList] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [DeleteConfirm] = useDeleteConfirm()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [selectLoading, setSelectLoading] = useState(false)

  const getMember = async (resSet?: boolean) => {
    setLoading(true)
    const [err, data] = await onLoadMore({ page, page_size })

    if (!err) {
      if (rolesList) {
        const { members = [] } = data

        if (resSet) {
          setMembersList([...members])
        } else {
          setMembersList((membersList: any) => {
            membersList.push(...members)
            return [...membersList]
          })
        }

        if (members.length < page_size) setHasMore(false)
      } else {
        const { users = [] } = data

        setMembersList((membersList: any) => {
          membersList.push(...users)
          return membersList
        })

        if (users.length < page_size) setHasMore(false)
      }
    } else {
      setHasMore(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    getMember()
  }, [page])

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const handleDelete = async (member) => {
    const deleteMember = async () => {
      if (rolesList) {
        setMembersList((membersList: []) => {
          membersList.map((item: any) => {
            if (item.user.id === member.user.id) {
              item.loading = true
            }
          })

          return [...membersList]
        })

        const [err] = await onDelete(member.id)

        if (err) {
          message.error('删除成员失败')
        } else {
          message.success('删除成员成功')

          setMembersList(() => membersList.filter((item) => item.id !== member.id))

          setList((list: any) => {
            list.forEach((item) => {
              if (item.id === member.user.id) {
                item.disabled = false
              }
            })
            return [...list]
          })

          // getMember(true)
        }
      } else {
        setMembersList((membersList: []) => {
          membersList.map((item: any) => {
            if (item.id === member.id) {
              item.loading = true
            }
          })

          return [...membersList]
        })

        const [err] = await onDelete(member.id)

        if (err) {
          message.error('删除成员失败')
        } else {
          message.success('删除成员成功')
          setMembersList(() => {
            const newArr = membersList.filter((item) => item.id !== member.id)
            return newArr
          })
          setList((list: any) => {
            list.map((item) => {
              if (item.id === member.id) {
                item.disabled = false
              }
            })
            return [...list]
          })
        }
      }
    }

    DeleteConfirm({
      content: `确定要删除 ${member.user ? member.user.name : member.name} 吗?`,
      handleOk: () => {
        deleteMember()
      },
    })
  }

  const searchUser = async (value: string) => {
    if (value) {
      setSelectLoading(true)

      const [err, users = []] = await onSearch(value)

      if (!err) {
        if (!users.length) {
          message.warning('不存在该用户')
        }
        membersList.forEach((item) => {
          users?.forEach((user) => {
            if (rolesList) {
              if (user.id === item.user.id) {
                user.disabled = true
              }
            } else {
              if (user.id === item.id) {
                user.disabled = true
              }
            }
          })
        })
        setList(users)
      } else {
        message.error(err)
      }

      setSelectLoading(false)
    }
  }

  const handleSearch = debounce(searchUser, 1200)

  const handleSelect = async (userId) => {
    if (rolesList) {
      const role = rolesList.find((item) => item.title === '标注人员')
      const member = list.find((item) => item.id === userId)
      const newMember = {
        role,
        user: member,
        id: member.id,
        loading: true,
      }

      setMembersList((membersList: any) => {
        membersList.push(newMember)
        return [...membersList]
      })

      const [err, data] = await onAdd({ user_id: userId, role_id: role.id })

      if (!err) {
        const { id } = data
        setMembersList((membersList: []) => {
          membersList.map((item: any) => {
            if (item.user.id === userId) {
              item.id = id
              item.loading = false
            }
          })

          return [...membersList]
        })

        message.success('添加成员成功')
      } else {
        setMembersList((membersList = []) => membersList.filter((item) => item.id !== userId))
        message.error('添加成员失败')
      }
    } else {
      setMembersList((membersList: any) => {
        const newUser = list.find((item) => item.id === userId)
        newUser.loading = true

        membersList.push(newUser)
        return [...membersList]
      })

      const [err] = await onAdd({ user_id: userId })

      if (!err) {
        setMembersList((membersList = []) => {
          membersList.forEach((item) => {
            if (item.id === userId) {
              item.loading = false
            }
          })
          return [...membersList]
        })

        message.success('添加成员成功')
      } else {
        setMembersList((membersList = []) => membersList.filter((item) => item.id !== userId))
        message.error('添加成员失败')
      }
    }
    setList([])
  }

  const handleRoleChange = async (value, record) => {
    setMembersList((membersList: []) => {
      membersList.map((item: any) => {
        if (item.user.id === record.user.id) {
          item.loading = true
        }
      })

      return [...membersList]
    })

    const role_id = rolesList.find((item) => item.title === value).id

    const [err] = await onUpdate(record.id, role_id)

    if (!err) {
      message.success('更新权限成功')
    } else {
      message.error('更新权限失败, 请刷新重试')
    }

    setMembersList((membersList: []) => {
      membersList.map((item: any) => {
        if (item.user.id === record.user.id) {
          item.loading = false
        }
      })

      return [...membersList]
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
      {title && (
        <Text className={styles.alignText} type="info">
          {title}
        </Text>
      )}
      <List
        header={
          <Select
            className=" w-full"
            showSearch
            placeholder="请输入用户名, 手机号或邮箱搜索用户"
            onSelect={handleSelect}
            onSearch={handleSearch}
            disabled={rolesList ? !addMember : userId !== createId}
            loading={selectLoading}
            value={null}
            onBlur={() => setList([])}
            notFoundContent={null}
            filterOption={false}
            dropdownClassName="overlay-3"
          >
            {list?.map((n: any) => (
              <Option disabled={n?.disabled} key={n.id} value={n.id}>
                <div className=" flex justify-between">
                  <div>{n.name}</div>
                  <div>{n?.disabled && <CheckOutlined style={{ color: '#348fe4' }} />}</div>
                </div>
              </Option>
            ))}
          </Select>
        }
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={listMember ? membersList : []}
        locale={{ emptyText: loading ? '加载中...' : <>暂无数据</> }}
        renderItem={(item: any) => {
          const newRoleList = rolesList?.filter((item) => item.level < level)

          return (
            <List.Item key={item.id} className={styles.listItem}>
              <div className={styles.createDiv}>
                {rolesList ? (
                  <OtterTableFieldCreator name={item?.user?.name} />
                ) : (
                  <OtterTableFieldCreator name={item.name} />
                )}
              </div>
              <div className={styles.selectDiv}>
                {rolesList && (
                  <Select
                    style={{ width: '100%' }}
                    dropdownClassName="overlay-3"
                    disabled={item.role.level >= level}
                    defaultValue={item?.role?.title}
                    size="small"
                    onChange={(value) => handleRoleChange(value, item)}
                  >
                    {newRoleList.map((item: any) => {
                      return (
                        <Option key={item?.id} value={item?.title}>
                          {item?.title}
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
                    {rolesList ? (
                      item.role.level < level && <DeleteOutlined />
                    ) : userId === createId ? (
                      item.id !== userId && item.id !== createId ? (
                        <DeleteOutlined />
                      ) : null
                    ) : null}
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

export default SelectMember
