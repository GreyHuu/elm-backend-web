import { business } from './index'
import { axios } from '@/utils/request'

/**
 * 使用分页获得全部的商家
 * @param parameter
 * @returns {AxiosPromise}
 */
export function getAllBusinessByPage(parameter) {
  return axios({
    url: business.GetAllBusiness,
    method: 'get',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav(token) {
  return axios({
    url: '/user/nav',
    method: 'get'
  })
}

export function logout() {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
