import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { TextComponentProps } from '@/config/defaultProps'
interface ComponentData {
  props: Partial<TextComponentProps>
  id: string
  name: string
}
export interface EditorProps {
  components: ComponentData[]
  currentElement: string
}

/** 测试数据--start */
export const testComponentData: ComponentData[]  = [
  {id: uuid(), name: 'l-text', props: { text: 'hello', fontSize: '14px', color: 'red' }},
  {id: uuid(), name: 'l-text', props: { text: 'hello2', fontSize: '16px', actionType: 'url', url: 'https://www.baidu.com' }},
  {id: uuid(), name: 'l-text', props: { text: 'hello3', fontSize: '12px' }},
]
/** 测试数据--end */

export const useEditorProps = defineStore('EditorProps', {
  state: (): EditorProps => ({
    components: testComponentData,
    currentElement: ''
  }),
  actions: {
    addComponents(component: ComponentData) {
      this.$state.components.push(component)
    }
  }
})