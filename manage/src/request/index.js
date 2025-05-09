import axios from 'axios'
import router from '../router'

// axios.defaults.headers.post['Content-Type'] =
// 'application/x-www-form-urlencoded';
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // withCredentials: true,
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('BLOG_TOKEN')
    if (token) {
      config.headers.authorization = 'Bearer ' + token //将token放到请求头发送给服务器
    }

    // 如果是get请求 参数增加时间戳，否则ie可能会不走服务器从缓存拿数据
    const ua = navigator.userAgent
    if (config.method.toLowerCase() === 'get' && ua.indexOf('MSIE') >= 1) {
      const t = new Date().getTime()
      if (config.params) {
        config.params['t'] = t
      } else {
        config.url += `${config.url.indexOf('?') > -1 ? '&' : '?'}=${t}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    return response.data
  },
  (error) => {
    // 未登录跳转登录页
    if (error.status == 401) {
      console.log(router)
      router.replace('/login')
    }
    return Promise.reject(error)
  },
)

export default service
