import React, { FC } from 'react'
import {
  Button,
  Divider,
  Space,
  Tag,
  Typography,
  Popconfirm,
  message,
  Modal
} from 'antd'
import {
  EditOutlined,
  BarChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, isPublished, title, answerCount, createAt, isStar } = props
  const { Link } = Typography
  const nav = useNavigate()
  const { confirm } = Modal

  const handleStar = () => {
    message.success('标星成功')
  }

  const handleStarCancel = () => {
    message.error('标星')
  }

  const handleDel = () => {
    confirm({
      title: '温馨提示',
      icon: <ExclamationCircleFilled />,
      content: '确认要删除吗',
      onOk() {
        message.success('删除成功')
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <Space>
            {isStar ? (
              <StarOutlined style={{ color: 'red' }}></StarOutlined>
            ) : (
              ''
            )}
            <Link
              onClick={() => {
                isPublished ? nav('/question/stat/3') : nav('/question/edit/3')
              }}
            >
              {title}
            </Link>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Tag color={isPublished ? 'processing' : 'default'}>
              {isPublished ? '已发布' : '未发布'}
            </Tag>
            <span>答卷：{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>

      <Divider style={{ margin: '12px 0' }}></Divider>

      <div className={styles.bottom}>
        <div className={styles.left}>
          <Button
            size="small"
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              nav('/question/edit/3')
            }}
          >
            编辑问卷
          </Button>
          <Button
            size="small"
            type="text"
            icon={<BarChartOutlined />}
            disabled={!isPublished}
            onClick={() => {
              nav('/question/stat/3')
            }}
          >
            数据统计
          </Button>
        </div>
        <div className={styles.right}>
          <Popconfirm
            title="温馨提示"
            description="是否确认标星"
            onConfirm={handleStar}
            onCancel={handleStarCancel}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" type="text" icon={<StarOutlined />}>
              {isStar ? '取消标星' : '标星'}
            </Button>
          </Popconfirm>
          <Button size="small" type="text" icon={<CopyOutlined />}>
            复制
          </Button>
          <Button
            size="small"
            type="text"
            icon={<DeleteOutlined />}
            onClick={handleDel}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
