const config = import.meta.env.MODE === 'production'
  ? envs
  : import.meta.env

export default {
  VITE_APP_SERVER_URL: config.VITE_APP_SERVER_URL
}