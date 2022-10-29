import { Avatar } from "antd"
import { Icon } from "otter-pro"

/*
 * @Author: D.Y.M
 * @Date: 2022-02-25 11:39:32
 * @LastEditTime: 2022-02-25 14:06:59
 * @FilePath: /main/src/views/Dashboard/components/app/index.tsx
 * @Description: 
 */
const Apps = () => {
    return <div className="flex flex-wrap">
        <div className=" w-36 text-lg flex flex-row items-center p-3 rounded cursor-pointer mb-2 hover:bg-medium">
            <div><Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="lake" />} /></div> <div className="ml-2 text-medium">数据湖</div>
        </div>
        <div className=" w-36 text-lg flex flex-row items-center p-3 rounded cursor-pointer mb-2 hover:bg-medium">
            <div><Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="set" />} /></div> <div className="ml-2 text-medium">数据集</div>
        </div>
        <div className=" w-36 text-lg flex flex-row items-center p-3 rounded cursor-pointer mb-2 hover:bg-medium">
            <div><Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="annotations" />} /></div> <div className="ml-2 text-medium">标注任务</div>
        </div>
        <div className=" w-36 text-lg flex flex-row items-center p-3 rounded cursor-pointer mb-2 hover:bg-medium">
            <div><Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="experiment" />} /></div> <div className="ml-2 text-medium">实验</div>
        </div>

        <div className=" w-36 text-lg flex flex-row items-center p-3 rounded cursor-pointer mb-2 hover:bg-medium">
            <div><Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="model" />} /></div> <div className="ml-2 text-medium">模型</div>
        </div>

        <div className=" w-36 text-lg flex flex-row items-center p-3 rounded cursor-pointer mb-2 hover:bg-medium">
            <div><Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="effect" />} /></div> <div className="ml-2 text-medium">效果测试</div>
        </div>
        <div className=" w-36 text-lg flex flex-row items-center p-3 rounded cursor-pointer mb-2 hover:bg-medium">
            <div><Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="integrate" />} /></div> <div className="ml-2 text-medium">集成测试</div>
        </div>

        <div className=" w-36 text-lg flex flex-row items-center p-3 rounded cursor-pointer mb-2 hover:bg-medium">
            <div><Avatar style={{ backgroundColor: '#f0f6ff', color: '#6c8fd9 ' }} icon={<Icon name="publish" />} /></div> <div className="ml-2 text-medium">发布</div>
        </div>
    </div>
}
export default Apps