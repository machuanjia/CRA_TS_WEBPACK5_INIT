interface TagItem {
  id: string
  tag: {
    key: {
      id: string
      title: string
    }
    value: {
      id: string
      title: string
    }
  }
}
// simple
export const getTagInfo = (key, value) => {
  return {
    tag: {
      key: {
        id: key.id,
        title: key.title,
      },
      value: {
        id: value.id,
        title: value.title,
      },
    },
  }
}

// 提取tag值
export const getTagKeyAndValue = (arg: TagItem) => {
  const target = {
    id: arg.id,
    tag: {
      key: {
        id: arg?.tag.key.id,
        title: arg?.tag.key.title,
      },
      value: {
        id: arg?.tag.value.id,
        title: arg?.tag.value.title,
      },
    },
  }
  return target
}

// 批量处理tag
export const getTagKeyAndValueList = (arg: TagItem[] = [], cb?: any) => {
  return arg.map((item) => (cb ? cb(getTagKeyAndValue(item)) : getTagKeyAndValue(item)))
}

// 找到父节点
export const getParentId = (tree, treeIndex: string) => {
  const keyArr = treeIndex.split('-').slice(1, -1)
  let node = tree[keyArr.shift()]
  keyArr.forEach((item) => {
    node = node.children[item]
  })
  return node && node.id
}

// 保留 n 级文件夹
export const filterDir = (arr: any, count: number) => {
  const lastChildKey = '0' + '-0'.repeat(count + 1)
  const arrStr = JSON.stringify(arr)
  if (!arr || !arr.length || !arrStr.includes(lastChildKey)) {
    return arr || []
  }
  // 广度优先遍历
  const target = JSON.parse(arrStr)
  let level = target
  // 第一层已被赋值
  let levelCount = 1
  while (level.length) {
    level = level.reduce((prev, item) => (item.children ? [...prev, ...item.children] : prev), [])
    if (++levelCount === count) {
      level.forEach((item) => {
        item.children = null
        item.isLeaf = true
      })
      level = []
    }
  }
  return target
}

export const treeSearch = (tree: any, title: string) => {
  if (!title) {
    return tree
  }
  const getDepth = (node) => {
    if (node) {
      const list = []
      if (node.children) {
        node.children.forEach((item) => {
          if (getDepth(item)) {
            list.push(getDepth(item))
          }
        })
      }
      if (list.length) {
        return { ...node, children: list }
      } else if (node.titleText.includes(title)) {
        return { ...node, children: null }
      }
      return false
    } else {
      return false
    }
  }
  return [getDepth(tree[0]) || { ...tree[0], children: null }]
}

export const addKey = (treeList: [], childrenName: string) => {
  const getDep = (list, treeIndex) => {
    list.forEach((item, index) => {
      item.keyIndex = treeIndex ? `${treeIndex}-${index}` : `${index}`
      if (item[childrenName]) {
        getDep(item[childrenName], item.keyIndex)
      }
    })
  }
  getDep(treeList, '')
  return treeList
}

export const getPathKey = (treeList, childrenName: string, keyIndex: string, ignore) => {
  let originData = treeList
  const indexList = keyIndex.split('-')
  return indexList.reduce((preItem, item) => {
    const key = originData[item].id
    originData = originData[item][childrenName]
    return ignore.includes(key) ? [...preItem] : [...preItem, key]
  }, [])
}

export const getDiff = (selectedData, originData) => {
  let matchIndex = 0
  selectedData.forEach((item) => {
    if (item === originData[matchIndex]) {
      matchIndex++
    }
  })
  return [originData.slice(matchIndex), originData.slice(0, matchIndex)]
}

export const getSelectedChildren = (treeList, selectedData, id) => {
  let tree = treeList
  let selectedChildren = []
  while (tree.length) {
    let level = []
    for (const { id: tagId, sub_tags: subTags } of tree) {
      if (selectedChildren.length) {
        if (selectedData.some((item) => item.id === tagId)) {
          selectedChildren.push(tagId)
        }
      } else if (tagId === id) {
        level = subTags
        selectedChildren = [id]
        break
      }
      if (subTags && subTags.length) {
        level = [...level, ...subTags]
      }
    }
    tree = level || []
  }
  return selectedChildren
}
