import React, { FC } from 'react'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponent } from '../../Edit/EditCanvas'
import classNames from 'classnames'
import styles from './index.module.scss'

type PropsType = {
  selectComponentId: string
  setSelectComponentId: (id: string) => void
  setSelectComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = (props) => {
  const { selectComponentId, setSelectComponentId, setSelectComponentType } =
    props
  const { componentList } = useGetComponentInfo()

  return (
    <>
      {componentList
        .filter((c) => !c.isHidden)
        .map((item) => {
          const { fe_id } = item
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectComponentId
          })

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={() => {
                setSelectComponentId(fe_id)
                setSelectComponentType(item.type)
              }}
            >
              <div className={styles.component}>{getComponent(item)}</div>
            </div>
          )
        })}
    </>
  )
}

export default ComponentList
