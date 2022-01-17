import axios from 'axios'
import { ICategory } from '../app_components/categories/Categories'

export const url = process.env.REACT_APP_SERVER_URL
export const auth_url = `${url}/api/auth`
export const user_url = `${url}/api/user`
export const super_admin_url = `${url}/api/super_admin`
export const categories_url = `${url}/api/categories`

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

export const getUser = () => axios.get(`${user_url}/user`)

export const superAdminGetUsers = () => axios.get(`${super_admin_url}/users`)
export const superAdminUpdateUser = (id: string, admin: boolean) =>
  axios.patch(`${super_admin_url}/update_user`, { id, admin })

export const login = (email: string, password: string) =>
  axios.post(`${auth_url}/login`, { email, password })
export const logout = () => axios.post(`${auth_url}/logout`, {})
export const register = (email: string, password: string) =>
  axios.post(`${auth_url}/register`, { email, password })
export const refreshToken = () => axios.post(`${auth_url}/token`, {})

export const getCategories = () => axios.get(`${categories_url}`)
export const removeCategory = (id: string) =>
  axios.delete(`${categories_url}/${id}`)
export const createCategory = (category: ICategory) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  let fd = new FormData()
  category.img && fd.append('file', category.img)
  category.name && fd.append('name', category.name)
  category.descriptrion && fd.append('descriptrion', category.descriptrion)
  category.tags && fd.append('tags', JSON.stringify(category.tags))
  category.parent && fd.append('parent', category.parent)
  return axios.post(`${categories_url}`, fd, config)
}
