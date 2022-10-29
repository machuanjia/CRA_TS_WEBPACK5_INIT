/*
 * @Author: D.Y.M
 * @Date: 2022-03-02 15:04:36
 * @LastEditTime: 2022-03-02 16:05:18
 * @FilePath: /main/src/views/NotFond/index.tsx
 * @Description: 
 */
import { Button } from "antd"
import { NotFound } from "otter-pro"
import { useNavigate } from 'react-router-dom'

import { getLocation } from "@/utils"

const UnFound = ()=>{
    const history = useNavigate()
    const handleBack = ()=>{
        history(getLocation('/',[]))  
    }
    return <div className=" h-screen"><NotFound redirect={<div className="flex justify-center"><Button type="ghost" onClick={handleBack}>返回首页</Button></div>}/></div>
}
export default UnFound