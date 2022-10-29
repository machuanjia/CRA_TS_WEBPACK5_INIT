/*
 * @Author: D.Y.M
 * @Date: 2021-10-25 16:06:15
 * @LastEditTime: 2021-10-29 18:57:28
 * @FilePath: /otter/src/models/IRoute.ts
 * @Description: 
 */


export interface IRoute {
    path: string,
    meta: {
        key: string,
        name: string,
        icon: string,
        permission: string,
    },
    component?: React.LazyExoticComponent<() => JSX.Element>
    children?: IRoute[]
}