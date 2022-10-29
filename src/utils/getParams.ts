/*
 * @Author: lubenben
 * @Date: 2022-08-07 11:28:09
 * @LastEditors: lubenben
 * @LastEditTime: 2022-08-07 11:28:29
 */
export const getTagsId = (tree) => {
  const target = {}
  tree.forEach((item) => {
    const list = []
    if (item.selected && item.id !== 'allAi') {
      list.push(item.id)
    } else {
      item.sub_tags.forEach((tag) => {
        if (tag.selected) {
          list.push(tag.id)
        }
      })
    }
    if (list.length) {
      target[item.params] = list
    }
  })
  return target
}
