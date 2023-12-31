import React, { FC, useState } from 'react'
import QuestionCard from '@/components/QuestionCard/index'
import styles from '../common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '@/components/ListSearch'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListPage from '@/components/ListPage'

const Star: FC = () => {
  useTitle('标星问卷')
  const { data = {}, loading = false } = useLoadQuestionListData({
    isStar: true
  })
  const { list = [], total = 0 } = data
  const { Title } = Typography

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={3}>标星问卷</Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </header>
      <div className={styles.content}>
        {list.length > 0 && !list.length && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!list.length && <Empty description="暂时没有更多数据了" />}
        {list.length === 0
          ? ''
          : list.map((q: any) => {
              return <QuestionCard key={q._id} {...q}></QuestionCard>
            })}
      </div>
      <footer className={styles.footer}>
        <ListPage total={total}></ListPage>
      </footer>
    </div>
  )
}

export default Star
