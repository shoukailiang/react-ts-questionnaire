import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
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
