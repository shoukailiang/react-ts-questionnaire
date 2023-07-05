import React, { FC, useState } from 'react'
import QuestionCard from '@/components/QuestionCard/index'
import styles from '../common.module.scss'
import { useTitle, useRequest } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '@/components/ListSearch/index'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'

const List: FC = () => {
  useTitle('问卷列表')

  const { data = {}, loading = false } = useLoadQuestionListData()

  const { list = [], total } = data

  const { Title } = Typography

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={3}>我的问卷</Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </header>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list && !list.length && (
          <Empty description="暂时没有更多数据了" />
        )}
        {!loading &&
          list.length &&
          list.map((q: any) => {
            return <QuestionCard key={q._id} {...q}></QuestionCard>
          })}
      </div>
      <footer className={styles.footer}>loadMore</footer>
    </div>
  )
}

export default List
