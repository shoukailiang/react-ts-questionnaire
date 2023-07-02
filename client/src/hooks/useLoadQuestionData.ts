import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/services/question'
import { useRequest } from 'ahooks'
import { useCallback } from 'react'

const useLoadQuestionData = () => {
  const { id = '' } = useParams() || {}

  const memoizedFn = useCallback(async () => {
    return await getQuestionService(id)
  }, [id])
  const { data, loading, error } = useRequest(memoizedFn)
  return { data, loading, error }
}

export default useLoadQuestionData
