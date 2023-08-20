import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
  user: UserStateType
  components: ComponentStateType
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    //组件列表
    components: componentReducer,
    //问卷信息
    pageInfo: pageInfoReducer
  }
})
