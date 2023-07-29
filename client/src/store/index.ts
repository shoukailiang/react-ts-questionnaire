import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentListType } from './componentsReducer'
export type StateType = {
  user: UserStateType
  componentList: ComponentListType
}

export default configureStore({
  reducer: {
    user: userReducer,
    componentList: componentReducer
  }
})
