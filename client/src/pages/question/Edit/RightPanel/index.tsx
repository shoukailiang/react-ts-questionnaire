import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import ComponentProp from '../ComponentProp'
import PageSetting from '../PageSetting'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'

// 枚举类型
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting'
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.SETTING_KEY)
  const { selectedId } = useGetComponentInfo()
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY)
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY)
    }
  }, [selectedId])
  const tabItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <PageSetting />
    }
  ]
  return (
    <>
      <Tabs activeKey={activeKey} items={tabItems} />
    </>
  )
}

export default RightPanel