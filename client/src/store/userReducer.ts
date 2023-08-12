import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserInfo } from '@/utils/user-token'
export type UserStateType = {
  name: string
  nickname: string
}
const { username, nickname } = getUserInfo()
const initialState: UserStateType = {
  name: username || '',
  nickname: nickname || ''
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      return action.payload
    },
    logoutReducer: () => {
      return initialState
    }
  }
})

const userReducer = userSlice.reducer
export default userReducer
export const { loginReducer, logoutReducer } = userSlice.actions
