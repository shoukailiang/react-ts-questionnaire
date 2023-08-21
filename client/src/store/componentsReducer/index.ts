import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { ComponentPropType } from '@/components/QuestionComponents'
import produce from 'immer'
import { getNextSelectedId, insertNewComponent } from '@/utils/utils'
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from '@dnd-kit/sortable'
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean // 是否隐藏
  isLocked?: boolean // 是否锁定
  props: ComponentPropType
}

export type ComponentStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
  copiedComponent: ComponentInfoType | null
}

const initialState: ComponentStateType = {
  selectedId: '',
  componentList: [],
  // 暂存复制的组件
  copiedComponent: null
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    // 重制所有组件
    reset(
      state: ComponentStateType,
      action: PayloadAction<ComponentStateType>
    ) {
      return action.payload
    },
    // 添加新组件
    addComponent: produce(
      (draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),
    changeComponentProp: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ id: string; newProp: ComponentPropType }>
      ) => {
        const { componentList } = draft
        const index = componentList.findIndex(
          (c) => c.fe_id === action.payload.id
        )
        if (index < 0) return
        componentList[index].props = action.payload.newProp
      }
    ),

    // 删除指定的组件
    deleteComponentBySelectedId: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft
      const index = componentList.findIndex((c) => c.fe_id === selectedId)
      if (index < 0) return

      // 重新计算selectedId
      const newId = getNextSelectedId(selectedId, componentList)
      draft.selectedId = newId
      componentList.splice(index, 1)
    }),

    // 组件隐藏/显示
    toggleComponentHidden: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        const { componentList } = draft
        const { fe_id, isHidden } = action.payload

        // 如果当前组件是被隐藏的
        let newSelectedId = ''
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          // 要显示
          newSelectedId = fe_id
        }

        // 更改当前选中的组件
        draft.selectedId = newSelectedId
        const component = componentList.find((c) => c.fe_id === fe_id)
        if (component) {
          component.isHidden = isHidden
        }
      }
    ),

    // 锁定/解锁组件
    toggleComponentLocked: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList } = draft
        const { fe_id } = action.payload
        const component = componentList.find((c) => c.fe_id === fe_id)
        if (!component) return
        component.isLocked = !component.isLocked
      }
    ),

    // 拷贝组件
    copySelectedComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft
      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId
      )
      if (!selectedComponent) return
      draft.copiedComponent = cloneDeep(selectedComponent) //深拷贝
    }),

    // 粘贴组件
    pasteComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList, copiedComponent } = draft
      if (!copiedComponent) return
      // !要修改fe_id
      copiedComponent.fe_id = nanoid()

      insertNewComponent(draft, copiedComponent)
    }),

    // 改进不可变数据的写法
    changeSelectedId: produce(
      (draft: ComponentStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload
      }
    ),
    // 选中上一个组件
    selectLastComponent: produce(
      (draft: ComponentStateType, action: PayloadAction<string>) => {
        const type = action.payload
        const { selectedId, componentList } = draft
        const index = componentList.findIndex((c) => c.fe_id === selectedId)
        // 未选中任何组件
        if (index < 0) return
        if (type === 'up') {
          if (index === 0) return
          draft.selectedId = componentList[index - 1].fe_id
        } else if (type === 'down') {
          if (index === componentList.length - 1) return
          draft.selectedId = componentList[index + 1].fe_id
        }
      }
    ),
    //修改组件标题
    changeComponentTitle: produce(
      (draft: ComponentStateType, action: PayloadAction<string>) => {
        const selectComponent = draft.componentList.find(
          (c) => c.fe_id === draft.selectedId
        )
        if (!selectComponent) return
        selectComponent.title = action.payload
      }
    ),

    // 图层修改隐藏状态
    changComponentHidden: produce(
      (draft: ComponentStateType, action: PayloadAction<string>) => {
        const id = action.payload
        const selectComponent = draft.componentList.find((c) => c.fe_id === id)
        if (!selectComponent) return
        const { isHidden } = selectComponent
        selectComponent.isHidden = !isHidden
      }
    ),

    // 图层修改锁定状态
    changLockHidden: produce(
      (draft: ComponentStateType, action: PayloadAction<string>) => {
        const id = action.payload
        const selectComponent = draft.componentList.find((c) => c.fe_id === id)
        if (!selectComponent) return
        const { isLocked } = selectComponent
        selectComponent.isLocked = !isLocked
      }
    ),

    sortComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { oldIndex, newIndex } = action.payload
        const { componentList } = draft
        draft.componentList = arrayMove(componentList, oldIndex, newIndex)
      }
    )
  }
})

export const {
  reset,
  changeSelectedId,
  addComponent,
  changeComponentProp,
  deleteComponentBySelectedId,
  toggleComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteComponent,
  selectLastComponent,
  changeComponentTitle,
  changComponentHidden,
  changLockHidden,
  sortComponent
} = componentsSlice.actions
export default componentsSlice.reducer
