import React, { FC, useState } from 'react'
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
import { useRequest } from 'ahooks'
import {
  duplicateQuestionService,
  editQuestionService
} from '@/services/question'
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
  const [isDeleted, setIsDeleted] = useState(false) //是否已经删除
  //修改标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { Link } = Typography
  const nav = useNavigate()
  const { confirm } = Modal

  // 修改问卷
  const {
    run: editStar,
    error,
    loading: changeStarLoading
  } = useRequest(
    async () => {
      await editQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess(res) {
        setIsStarState(!isStarState) //更新state
        message.success('已标星')
      }
    }
  )

  //复制问卷
  const { loading: duplicateLoading, run: duplicateQuestionCard } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(res: any) {
        message.success('复制成功')
        nav(`/question/edit/${res.id}`)
      }
    }
  )

  //删除问卷
  const { loading: deleteLoading, run: deleteService } = useRequest(
    async () => await editQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeleted(true)
      }
    }
  )

  // 已经删除的卡片不要再渲染卡片了
  if (isDeleted) {
    return null
  }

  const handleDel = () => {
    confirm({
      title: '温馨提示',
      icon: <ExclamationCircleFilled />,
      content: '确认要删除吗',
      onOk: () => deleteService()
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
          <Button
            icon={<StarOutlined />}
            type="text"
            size="small"
            style={isStar ? { color: '#1677ff' } : {}}
            onClick={editStar}
            disabled={changeStarLoading}
          >
            {isStarState ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title="确定复制该问卷？"
            okText="Yes"
            cancelText="No"
            onConfirm={duplicateQuestionCard}
          >
            <Button
              icon={<CopyOutlined />}
              type="text"
              size="small"
              disabled={duplicateLoading}
            >
              复制
            </Button>
          </Popconfirm>
          <Button
            size="small"
            type="text"
            icon={<DeleteOutlined />}
            onClick={handleDel}
            disabled={deleteLoading}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
