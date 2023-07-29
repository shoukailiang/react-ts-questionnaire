import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/services/question'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ComponentListType, reset } from '@/store/componentsReducer'

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
    dispatch(reset({ componentList }))
  }, [data])

  return {
    loading,
    error
  }
}

export default useLoadQuestionData
