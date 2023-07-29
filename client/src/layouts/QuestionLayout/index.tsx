import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useNavPage from '@/hooks/useNavPage'
import useLoadUserData from '@/hooks/useLoadUserData'
const QuestionLayout: FC = () => {
  useLoadUserData()
  useNavPage()
  return (
    <div style={{ height: '100vh' }}>
      <div>QuestionLayout left</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default QuestionLayout
