import { defineStore } from 'pinia'

export interface UserProps {
  isLogin: boolean
  userName: string
}

export const useUserProps = defineStore('userProps', {
  state: (): UserProps => ({
    isLogin: false,
    userName: '',
  }),
})
