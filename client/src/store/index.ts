import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentStateType> // 增加了undo
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    //组件列表
    //  加了undo以后
    components: undoable(componentReducer, {
      limit: 10, // 保留10步历史记录
      // 过滤掉不需要记录的action
      filter: excludeAction([
        'components/reset',
        'components/changeSelectedId',
        'components/selectLastComponent'
      ])
    }),
    //问卷信息
    pageInfo: pageInfoReducer
  }
})
