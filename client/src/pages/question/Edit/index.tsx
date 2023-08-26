import React, { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '@/store/componentsReducer'
import { useTitle } from 'ahooks'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import EditCanvas from './EditCanvas'
import styles from './index.module.scss'

const Edit: FC = () => {
  useTitle('编辑问卷')
  const { loading, error } = useLoadQuestionData()
  const dispatch = useDispatch()
  // 取消选中状态
  const cancelSelected = () => {
    dispatch(changeSelectedId(''))
  }
  return (
    <>
      <div className={styles.container}>
        <EditHeader />
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

            <div className={styles.right}>
              <RightPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit
