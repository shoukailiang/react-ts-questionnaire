import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useNavPage from '@/hooks/useNavPage'
import useLoadUserData from '@/hooks/useLoadUserData'
const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  // 用户没有登录时，跳转到登录页
  useNavPage(waitingUserData)
  return (
    <div style={{ height: '100vh' }}>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default QuestionLayout
