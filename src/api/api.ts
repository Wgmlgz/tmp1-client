import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL
const auth_url = `${url}/api/auth`

axios.interceptors.request.use(
  config => {
    config.withCredentials = true

    if (!config.url || !config.headers)
      throw new Error('config.url or config.headers are undefined')

    return config
  },
  error => Promise.reject(error)
)

const createAxiosResponseInterceptor = () => {
  const interceptor = axios.interceptors.response.use(
    response => response,
    async error => {
      if (error.response.status !== 401) return Promise.reject(error)

      axios.interceptors.response.eject(interceptor)

      return refreshToken()
        .then(res => axios(error.response.config))
        .catch(err => Promise.reject(err))
        .finally(createAxiosResponseInterceptor)
    }
  )
}
createAxiosResponseInterceptor()

export const getUser = () => axios.get(`${auth_url}/user`)
export const getUsers = () => axios.get(`${auth_url}/users`)
export const login = (email: string, password: string) =>
  axios.post(`${auth_url}/login`, { email, password })
export const logout = () => axios.post(`${auth_url}/logout`, {})
export const register = (email: string, password: string) =>
  axios.post(`${auth_url}/register`, { email, password })
export const refreshToken = () => axios.post(`${auth_url}/token`, {})
