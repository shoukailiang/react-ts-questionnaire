import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/router/index'
import styles from './index.module.scss'

const { Title } = Typography

const Logo: FC = () => {
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>Liang问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
