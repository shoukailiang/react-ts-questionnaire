import React, { FC, useCallback } from 'react'
import { Typography } from 'antd'
import {
  ComponentConfigType,
  componentGroupList
} from '@/components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { addComponent } from '@/store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'
const { Title } = Typography
import styles from './index.module.scss'

const getComponent = (c: ComponentConfigType) => {
  const { Component, type, title, defaultProps } = c
  const dispatch = useDispatch()
  // 点击添加到画布
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        type,
        title,
        fe_id: nanoid(),
        props: {
          ...defaultProps
        }
      })
    )
  }, [])

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentGroupList.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => getComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
