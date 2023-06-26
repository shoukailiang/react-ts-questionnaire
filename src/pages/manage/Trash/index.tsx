import React, { FC, useState } from 'react'
import styles from '../common.module.scss'
import { useTitle } from 'ahooks'
import { Empty, Table, Typography, Tag, Space, Button } from 'antd'

const questionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: true,
    isStar: true,
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
    isStar: true,
    answerCount: 15,
    createAt: '3月10日 13:23'
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 51,
    createAt: '3月10日 13:23'
  }
]

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => (
      <>
        <Tag color={isPublished ? 'processing' : 'default'}>
          {isPublished ? '已发布' : '未发布'}
        </Tag>
      </>
    )
  },
  {
    title: '是否标星',
    dataIndex: 'isStar',
    render: (isStar: boolean) => (
      <>
        <Tag color={isStar ? 'processing' : 'default'}>
          {isStar ? '已标星' : '未标星'}
        </Tag>
      </>
    )
  },
  {
    title: '答卷',
    dataIndex: 'answerCount'
  },
  {
    title: '创建时间',
    dataIndex: 'createAt'
  }
]

const Trash: FC = () => {
  useTitle('回收站')
  const [questionArr] = useState(questionList)

  const [selectArr, setSelectArr] = useState<string[]>([])

  const { Title } = Typography

  const onChange = (selectedRowKeys: string[]) => {
    console.log(selectedRowKeys)
    setSelectArr(selectedRowKeys)
  }

  const table = (
    <>
      <Space style={{ marginBottom: '10px' }}>
        <Button disabled={!selectArr.length}>恢复</Button>
        <Button disabled={!selectArr.length}>删除</Button>
      </Space>

      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            onChange(selectedRowKeys as string[])
          }
        }}
        pagination={false}
        dataSource={questionArr}
        columns={columns}
        rowKey="title"
      ></Table>
    </>
  )

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={3}>回收站</Title>
        <div className={styles.right}>(搜索)</div>
      </header>

      <div className={styles.content}>
        {!questionArr.length && <Empty description="暂无数据"></Empty>}

        {questionArr.length && table}
      </div>

      <footer className={styles.footer}>分页</footer>
    </div>
  )
}

export default Trash
