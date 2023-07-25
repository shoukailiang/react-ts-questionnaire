import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useNavPage from '@/hooks/useNavPage'
const QuestionLayout: FC = () => {
  useNavPage()
  return (
    <div>
      <div>QuestionLayout left</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default QuestionLayout
