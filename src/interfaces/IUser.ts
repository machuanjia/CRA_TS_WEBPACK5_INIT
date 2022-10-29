/*
 * @Author: D.Y.M
 * @Date: 2021-10-25 15:31:58
 * @LastEditTime: 2021-11-08 11:37:58
 * @FilePath: /otter/src/models/IUser.ts
 * @Description: 
 */

import type { IModel } from 'otter-pro'
export interface IUser extends IModel {
    uid: string;
    username: string;
}