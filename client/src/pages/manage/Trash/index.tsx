import React, { FC, useState } from 'react'
import styles from '../common.module.scss'
import { useRequest, useTitle } from 'ahooks'
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Spin,
  message
} from 'antd'
import ListSearch from '@/components/ListSearch/index'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListPage from '@/components/ListPage/index'
import { deleteQuestionService, editQuestionService } from '@/services/question'
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
  const {
    data = {},
    loading = false,
    error,
    refresh
  } = useLoadQuestionListData({
    isDeleted: true
  })
  const { list = [], total = 0 } = data

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const { Title } = Typography

  const onChange = (selectedRowKeys: string[]) => {
    console.log(selectedRowKeys)
    setSelectedRowKeys(selectedRowKeys)
  }

  // 恢复问卷
  const { run: restore, loading: restoreLoading } = useRequest(
    async () => {
      for await (const id of selectedRowKeys) {
        await editQuestionService(String(id), { isDeleted: false })
      }
    },
    {
      manual: true,
      onSuccess() {
        message.success('恢复成功')
        // 手动刷新列表
        refresh()
        setSelectedRowKeys([])
      },
      debounceWait: 500 //防抖
    }
  )

  // 彻底删除
  const { run: completeDelete, loading: deleteLoading } = useRequest(
    async () => deleteQuestionService(selectedRowKeys),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedRowKeys([])
      }
    }
  )

  const table = (
    <>
      <Space style={{ marginBottom: '10px' }}>
        <Button
          type="primary"
          disabled={!selectedRowKeys.length || restoreLoading}
          onClick={restore}
        >
          恢复
        </Button>
        <Button
          danger
          type="primary"
          disabled={!selectedRowKeys.length || deleteLoading}
          onClick={completeDelete}
        >
          彻底删除
        </Button>
      </Space>

      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            onChange(selectedRowKeys as string[])
          }
        }}
        pagination={false}
        dataSource={list}
        columns={columns}
        rowKey="title"
      ></Table>
    </>
  )

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={3}>回收站</Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </header>

      <div className={styles.content}>
        {loading && !list.length && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!list.length && <Empty description="暂无数据"></Empty>}

        {list.length === 0 ? '' : table}
      </div>
      {list.length > 0 && (
        <footer className={styles.footer}>
          <ListPage total={total}></ListPage>
        </footer>
      )}
    </div>
  )
}

export default Trash
