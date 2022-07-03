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

type updateComponentProps = {
  key: keyof TextComponentProps
  value: string
}

/** 测试数据--start */
export const testComponentData: ComponentData[] = [
  {
    id: uuid(),
    name: 'l-text',
    props: {
      text: 'hello',
      fontSize: '14px',
      lineHeight: '2',
      color: '#f5222d',
      opacity: '0.5',
    },
  },
  {
    id: uuid(),
    name: 'l-text',
    props: {
      text: 'hello2',
      fontSize: '16px',
      actionType: 'url',
      url: 'https://www.baidu.com',
    },
  },
  {
    id: uuid(),
    name: 'l-text',
    props: { text: 'hello3', fontSize: '12px', lineHeight: '1', textAlign: 'left', fontFamily: '"SimSun","STSong"' },
  },
]
/** 测试数据--end */

export const useEditorProps = defineStore('EditorProps', {
  state: (): EditorProps => ({
    components: testComponentData,
    currentElement: '',
  }),
  getters: {
    activeComponent(state) {
      return state.components.find((component) => component.id === state.currentElement)
    },
  },
  actions: {
    addComponents(component: ComponentData) {
      this.$state.components.push(component)
    },

    delComponent(componentId: string) {
      this.$state.components = this.$state.components.filter((component) => component.id !== componentId)
      if (componentId === this.currentElement) this.currentElement = ''
    },

    setActive(id: string) {
      this.$state.currentElement = id
    },

    updateProps({ key, value }: updateComponentProps) {
      const activeComponent = this.$state.components.find((component) => component.id === this.$state.currentElement)
      if (!activeComponent) return
      activeComponent.props[key] = value
    },
  },
})
