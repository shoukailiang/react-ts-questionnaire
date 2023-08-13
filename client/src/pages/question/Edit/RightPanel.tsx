import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { FC } from 'react'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
  const tabItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <div>页面设置</div>
    }
  ]
  return (
    <>
      <Tabs defaultActiveKey="prop" items={tabItems} />
    </>
  )
}

export default RightPanel
