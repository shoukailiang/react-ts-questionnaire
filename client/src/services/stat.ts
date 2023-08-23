import axios, { DataType } from './axios'

export async function getQuestionStatListService(
  questionId: string,
  opt: {
    page: number
    pageSize: number
  }
): Promise<DataType> {
  const url = `/api/stat/${questionId}`
  const data = (await axios.get(url, { params: opt })) as DataType
  return data
}

// 获取组件的统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<DataType> {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as DataType
  return data
}
