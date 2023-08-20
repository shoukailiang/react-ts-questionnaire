import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: ''
}

export const PageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (
      state: PageInfoType,
      action: PayloadAction<PageInfoType>
    ) => {
      return action.payload
    },
    changeTitle: produce(
      (draft: PageInfoType, action: PayloadAction<string>) => {
        draft.title = action.payload
      }
    )
  }
})

const pageInfoReducer = PageInfoSlice.reducer
export default pageInfoReducer

export const { resetPageInfo, changeTitle } = PageInfoSlice.actions
