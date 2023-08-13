/*
  问卷的标题组件
*/

import QuestionTitle from './component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '标题',
  type: 'questionTitle', //要和后端统一
  Component: QuestionTitle,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps
}
