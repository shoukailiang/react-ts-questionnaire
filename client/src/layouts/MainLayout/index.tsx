import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
import styles from './index.module.scss'
import useNavPage from '@/hooks/useNavPage'
import useLoadUserData from '@/hooks/useLoadUserData'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  // 判断路由跳转
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {' '}
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.footer}>
        Liang问卷 &copy;2023 - present. Created by Liang
      </Footer>
    </Layout>
  )
}

export default MainLayout
