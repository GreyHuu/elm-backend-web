import { business, order } from './index'
import { axios } from '@/utils/request'

/**
 * 分页获取订单
 * @param param
 * {
 *   count
 * }
 * @returns {AxiosPromise}
 */
export function getAllOrder(param) {
  return axios({
    url: order.GetAllOrder + param.count,
    method: 'get'
  })
}

/**
 * 删除订单
 * @param param
 * {
 *   id:1111
 * }
 * @returns {AxiosPromise}
 */
export function delOrder(param) {
  return axios({
    url: order.DelOrder + param.id,
    method: 'delete'
  })
}

/**
 * 模糊查找订单
 * @param param
 * {
 *   name
 * }
 * @returns {*}
 */
export function searchOrder(param) {
  return axios({
    url: order.SearchOrder+param.name,
    method: 'get',
  })
}