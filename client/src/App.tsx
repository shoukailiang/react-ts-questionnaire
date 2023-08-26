import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import 'antd/dist/reset.css'
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  )
}

export default App
