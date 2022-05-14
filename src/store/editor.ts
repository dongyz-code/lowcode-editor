import { defineStore } from 'pinia'

export const useEditorState = defineStore('EditorState', {
  state: () => ({
    counter: 0
  })
})