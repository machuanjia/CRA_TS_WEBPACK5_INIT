export const permissionTreeFilter = (
  permissions: any[],
  isHasPermission: (key: string) => boolean,
) => {
  const result = []

  permissions?.forEach((item) => {
    if (isHasPermission(item.meta.permission)) {
      if (item?.children) {
        item.children = permissionTreeFilter(item.children, isHasPermission)
        result.push(item)
      } else {
        result.push(item)
      }
    }
  })


  return result
}
