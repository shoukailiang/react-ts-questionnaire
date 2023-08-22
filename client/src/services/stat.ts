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
