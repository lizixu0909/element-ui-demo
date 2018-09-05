import axios from 'axios'

/* 用户登录 */
export const login = data => axios.post(`/login`, data)
/* 退出登陆 */
export const logout = () => axios.get(`/logout`)
