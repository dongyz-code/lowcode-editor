import { defineStore } from 'pinia'

export interface TemplateProps {
  id: number | null
  title: string
  coverImg: string
  author: string
  copiedCount: number | null
}

export const useTemplateProps = defineStore('TemplateProps', {
  state: (): TemplateProps => ({
    id: null,
    title: '',
    coverImg: '',
    author: '',
    copiedCount: null,
  })
})