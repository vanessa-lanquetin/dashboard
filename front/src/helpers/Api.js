import axios from 'axios'
import config from './config'

const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: config.VITE_APP_SERVER_URL + '/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default api