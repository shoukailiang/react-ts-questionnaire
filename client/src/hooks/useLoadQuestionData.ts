import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/services/question'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ComponentStateType, reset } from '@/store/componentsReducer'

const useLoadQuestionData = () => {
  const { id = '' } = useParams() || {}

  const dispatch = useDispatch()
  const { data, loading, run, error } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('问卷id不能为空')

      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true
    }
  )

  // 判断id变化，执行加载ajax数据
  useEffect(() => {
    run(id)
  }, [id])

  //根据data设置redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data
    // 存储到redux store中
    // 设置默认的selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      // 默认设置第一个组件为选中
      selectedId = componentList[0].fe_id
    }

    dispatch(reset({ componentList, selectedId }))
  }, [data])

  return {
    loading,
    error
  }
}

export default useLoadQuestionData
