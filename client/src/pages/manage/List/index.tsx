import React, { FC, useState, useRef, useMemo, useEffect } from 'react'
import QuestionCard from '@/components/QuestionCard/index'
import styles from '../common.module.scss'
import { useTitle, useRequest, useDebounceFn } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import ListSearch from '@/components/ListSearch/index'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/constant'
import { getQuestionListService } from '@/services/question'
const List: FC = () => {
  useTitle('问卷列表')
  type listData = {
    _id: string
    title: string
    isPublished: boolean
    isStar: boolean
    answerCount: number
    createAt: string
    idDeleted: boolean
  }
  const [stared, setStarted] = useState(false) //标记是否已经开始加载（防抖有延迟时间）
  const [list, setList] = useState<listData[]>([]) //全部的列表数据
  const [page, setPage] = useState(1) //list 内部的数据，不会影响url参数
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const containerRef = useRef<HTMLDivElement>(null)

  const { Title } = Typography

  useEffect(() => {
    // 全部重制
    setStarted(false)
    setList([])
    setPage(1)
    setTotal(0)
  }, [keyword])

  // 真正加载函数
  const {
    loading,
    run: load,
    data
  } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword
      })
      return data
    },
    {
      manual: true, //手动触发
      // 加载成功的方法
      onSuccess(res) {
        const { list: l = [], total = 0 } = res || {}
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      }
    }
  )

  // 触发加载函数
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // 只有加载在视野内才能真正的加载
      const elem = containerRef.current
      if (elem === null) return
      const domRect = elem?.getBoundingClientRect()
      if (domRect === null) return
      const { bottom } = domRect as DOMRect
      if (bottom < window.innerHeight) {
        load()
        setStarted(true) //标记已经开始加载
      }
    },
    {
      wait: 1000
    }
  )

  // 可以缓存一下这个函数，避免重复创建
  const loadMoreContentElm = useMemo(() => {
    if (!stared || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) {
      return <span>没有更多数据了</span>
    }
    return <span>上滑加载更多</span>
  }, [stared, loading, total, haveMoreData])

  // 当页面触发滚动的时候，要尝试触发加载
  useEffect(() => {
    //开始的时候会触发一次，并且在query参数变化的时候触发，即搜索的时候触发
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      // 记得组件销毁的时候解绑事件监听
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={3}>我的问卷</Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </header>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item: listData) => {
            const { _id } = item
            console.log(_id)
            return <QuestionCard key={_id} {...item}></QuestionCard>
          })}
      </div>
      <div className={styles.footer} ref={containerRef}>
        {loadMoreContentElm}
      </div>
    </div>
  )
}

export default List
