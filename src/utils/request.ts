import axios from 'axios'

const instance = axios.create({
  timeout: 20,
})

instance.interceptors.request.use((config) => {
  // config.
  return config
})

// instance.interceptors.response.use((config) => {

// })

export default instance
