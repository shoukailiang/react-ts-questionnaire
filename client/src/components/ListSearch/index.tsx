import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '@/constant'

const ListSearch: FC = () => {
  const { Search } = Input
  const [value, setValue] = useState<string>('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // 点击搜索,修改url
  const onSearch = () => {
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }

  // 根据url,控制value, 根据searchParams修改value
  useEffect(() => {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    keyword && setValue(keyword)
  }, [searchParams])

  return (
    <>
      <Search
        size="large"
        onChange={handleChange}
        onSearch={onSearch}
        value={value}
        allowClear
        style={{ width: '200px' }}
      ></Search>
    </>
  )
}

export default ListSearch
