import { useRequest } from 'ahooks'
import { getQuestionListService } from '@/services/question'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY
} from '@/constant'

type ParamType = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
}

const useLoadQuestionListData = (opt: Partial<ParamType> = {}) => {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const pageSize =
    parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
  const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
  const { data, loading, error, refresh } = useRequest(
    () => {
      return getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        pageSize,
        page
      })
    },
    {
      refreshDeps: [searchParams]
    }
  )

  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
