import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: FC = () => {
  const nav = useNavigate()
  return (
    <>
      <h1>Login</h1>
      <button
        onClick={() => {
          nav(-1)
        }}
      ></button>
    </>
  )
}

export default Login
