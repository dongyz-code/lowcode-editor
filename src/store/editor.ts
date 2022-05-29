import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
interface ComponentData {
  props: {[key: string]: any}
  id: string
  name: string
}
export interface EditorProps {
  components: ComponentData[]
  currentElement: string
}

/** 测试数据--start */
export const testComponentData = [
  {id: uuid(), name: 'l-text', props: { text: 'hello', fontSize: '14px' }},
  {id: uuid(), name: 'l-text', props: { text: 'hello2', fontSize: '16px' }},
  {id: uuid(), name: 'l-text', props: { text: 'hello3', fontSize: '12px' }},
]
/** 测试数据--end */

export const useEditorProps = defineStore('EditorProps', {
  state: (): EditorProps => ({
    components: testComponentData,
    currentElement: ''
  })
})