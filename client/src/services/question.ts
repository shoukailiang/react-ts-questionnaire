import axios, { DataType } from './axios'

type questionListServiceParamsType = {
  keyword: string
  page: number
  pageSize: number
  isStar: boolean
  isDeleted: boolean
  inPublished: boolean
}

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

export const getQuestionListService = async (
  opt: Partial<questionListServiceParamsType>
) => {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opt })) as DataType
  return data
}

// 修改问卷
export async function editQuestionService(
  id: string,
  opt: Partial<questionListServiceParamsType>
): Promise<DataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as DataType
  return data
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<DataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as DataType
  return data
}

// 批量彻底问卷
export async function deleteQuestionService(ids: string[]): Promise<DataType> {
  const url = `/api/question`
  const data = (await axios.delete(url, { data: ids })) as DataType
  return data
}
