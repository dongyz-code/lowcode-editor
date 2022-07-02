import axios from 'axios'

export const getUserName = (id: string | number) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res: any) => {
    return res.data.username
  })
}
