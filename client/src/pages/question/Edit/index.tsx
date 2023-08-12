import React, { FC, useState } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '@/store/componentsReducer'
import LeftPanel from './LeftPanel'

const Edit: FC = () => {
  const { id = '' } = useParams()
  const { loading, error } = useLoadQuestionData()
  const dispatch = useDispatch()
  // 取消选中状态
  const cancelSelected = () => {
    dispatch(changeSelectedId(''))
  }
  return (
    <>
      <div className={styles.container}>
        <div>header</div>
        <div className={styles['container-wrapper']}>
          <div className={styles.content}>
            <div className={styles.left}>
              <LeftPanel />
            </div>

            <div className={styles.main} onClick={cancelSelected}>
              <div className={styles['canvas-wrapper']}>
                <div style={{ height: '900px' }}>
                  <EditCanvas loading={loading} />
                </div>
              </div>
            </div>

            <div className={styles.right}>right</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit
