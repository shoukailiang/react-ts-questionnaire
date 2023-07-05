import { DataType } from './axios'
import axios from './axios'

export const getQuestionService = async (id: string) => {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as DataType
  return data
}

export const createQuestionService = async () => {
  const url = '/api/question'
  const data = (await axios.post(url)) as DataType
  return data
}

type questionListServiceParamsType = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
}

export const getQuestionListService = async (
  opt: Partial<questionListServiceParamsType>
) => {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opt })) as DataType
  return data
}
