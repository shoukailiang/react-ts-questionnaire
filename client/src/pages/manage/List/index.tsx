import React, { FC, useState } from 'react'
import QuestionCard from '@/components/QuestionCard/index'
import styles from '../common.module.scss'
import { useTitle } from 'ahooks'
import { Empty } from 'antd'
import { Typography } from 'antd'
import ListSearch from '@/components/ListSearch/index'
const questionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 13:23'
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: '3月10日 13:23'
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 15,
    createAt: '3月10日 13:23'
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 51,
    createAt: '3月10日 13:23'
  }
]

const List: FC = () => {
  useTitle('问卷列表')
  const [questionArr] = useState(questionList)

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
        {!questionArr.length && <Empty description="暂时没有更多数据了" />}
        {questionArr.length &&
          questionArr.map((q) => {
            return <QuestionCard key={q._id} {...q}></QuestionCard>
          })}
      </div>
      <footer className={styles.footer}>loadMore</footer>
    </div>
  )
}

export default List
