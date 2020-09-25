import { user } from './index'
import { axios } from '@/utils/request'

/**
 * 登录
 * @param param
 * {
 *   account:
 *   password
 * }
 * @returns {*}
 */
export function login(param) {
  return axios({
    url: user.Login + '?account=' + param.account + '&password=' + param.password,
    method: 'post'
  })
}

/**
 * 获得全部的用户
 * @returns {AxiosPromise}
 */
export function getAllUser() {
  return axios({
    url: user.GetAllUser,
    method: 'get'
  })
}

/**'
 * 删除用户
 * @param param
 * {
 *   id
 * }
 * @returns {AxiosPromise}
 */
export function deleteUser(param) {
  return axios({
    url: user.DelUser + param.id,
    method: 'delete'
  })
}

/**
 * 获得用户的信息
 * @param param
 * {
 *   id
 * }
 * @returns {AxiosPromise}
 */
export function getUserInfo(param) {
  return axios({
    url: user.GetUserInfo + param,
    method: 'post'
  })
}

/**
 * 更改用户信息
 * @param param
 * @returns {AxiosPromise}
 */
export function changeUser(param) {
  return axios({
    url: user.DelUser,
    method: 'get',
    data: param
  })
}

/**
 * 根据名字搜索用户
 * @param param
 * {
 *   name
 * }
 * @returns {AxiosPromise}
 */
export function searchUserByName(param) {
  return axios({
    url: user.SearchUserByName+"?name="+param.name,
    method: 'get',
  })
}
