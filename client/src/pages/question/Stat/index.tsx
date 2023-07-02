import React, { FC, useState } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <>
      <p>Stat Page</p>
      <p>{loading ? 'loading' : JSON.stringify(data)}</p>
    </>
  )
}

export default Stat
