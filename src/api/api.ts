import axios from 'axios'

export const getAccessToken = () => localStorage.getItem('access_token')
export const removeAccessToken = () => localStorage.removeItem('access_token')
export const setAccessToken = (token: string) =>
  localStorage.setItem('access_token', token)
export const getRefreshToken = () => localStorage.getItem('refresh_token')
export const removeRefreshToken = () => localStorage.removeItem('refresh_token')
export const setRefreshToken = (token: string) =>
  localStorage.setItem('refresh_token', token)

const url = 'http://localhost:5000'
const auth_url = `${url}/api/auth`

axios.interceptors.request.use(
  config => {
    if (!config.url || !config.headers)
      throw new Error('config.url or config.headers are undefined')
    const { origin } = new URL(config.url)
    if ([url].includes(origin))
      config.headers.authorization = `Bearer ${getAccessToken()}`

    return config
  },
  error => Promise.reject(error)
)

const createAxiosResponseInterceptor = () => {
  const interceptor = axios.interceptors.response.use(
    response => response,
    async error => {
      if (error.response.status !== 401) {
        return Promise.reject(error)
      }

      axios.interceptors.response.eject(interceptor)

      return refreshToken()
        .then(res => {
          setAccessToken(res.data.accessToken)
          return axios(error.response.config)
        })
        .catch(err => {
          removeAccessToken()
          return Promise.reject(err)
        })
        .finally(createAxiosResponseInterceptor)
    }
  )
}
createAxiosResponseInterceptor()

export const getUser = () => axios.get(`${auth_url}/user`)
export const getUsers = () => axios.get(`${auth_url}/users`)
export const login = (email: string, password: string) =>
  axios.post(`${auth_url}/login`, { email, password })
export const logout = () => {
  const token = getRefreshToken()
  removeAccessToken()
  removeRefreshToken()
  return axios.post(`${auth_url}/logout`, {
    token,
  })
}
export const register = (email: string, password: string) =>
  axios.post(`${auth_url}/register`, { email, password })
export const refreshToken = () =>
  axios.post(`${auth_url}/token`, {
    token: getRefreshToken(),
  })
