import React, { FC, useState } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { useParams } from 'react-router-dom'
const Edit: FC = () => {
  const { id = '' } = useParams()
  const { loading, data } = useLoadQuestionData()
  return (
    <>
      <p>Edit</p>
      <p>Edit Page</p>
      <p>{loading ? 'loading' : JSON.stringify(data)}</p>
    </>
  )
}

export default Edit
