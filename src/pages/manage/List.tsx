import React, { FC, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'

const rawQuestionList = [
  {
    _id: 1,
    title: 'Question 1',
    isPublished: false,
    isStart: false,
    answerCount: 5,
    createAt: '4月10日15点14分'
  },
  {
    _id: 2,
    title: 'Question 2',
    isPublished: true,
    isStart: false,
    answerCount: 15,
    createAt: '4月11日15点14分'
  }
]
const List: FC = () => {
  // const [searchParams] = useSearchParams()
  const [questionList, setQuestionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles.footer}>fotter</div>
    </>
  )
}

export default List
