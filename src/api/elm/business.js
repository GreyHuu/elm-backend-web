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

/**
 * 删除商家
 * @param parameter
 * {
 *   id
 * }
 * @returns {AxiosPromise}
 */
export function deleteBusiness(parameter) {
  return axios({
    url: business.DelBusiness + parameter.id,
    method: 'post'
  })
}

/**
 * 模糊查找店铺
 * @param parameter
 * @returns {*}
 */
export function searchBusinessByName(parameter) {
  return axios({
    url: business.SearchBusinessByName + '?name=' + parameter.name + '&pageNum=' + parameter.pageNum + '&pageSize=' + parameter.pageSize,
    method: 'post'
  })
}

/**
 * 通过id获得店铺信息
 * @param parameter
 * {
 *   id
 * }
 * @returns {AxiosPromise}
 */
export function getBusinessById(parameter) {
  return axios({
    url: business.GetBusinessInfoById + parameter.id,
    method: 'get'
  })
}

/**
 * 更改店铺的信息
 * @param parameter
 * {
	"categoryId": 0,
	"detail": "",
	"id": 0,
	"location": "",
	"name": "",
	"phone": "",
	"pic": ""
}
 * @returns {*}
 */
export function changeBusinessInfo(parameter) {
  return axios({
    url: business.ChangeBusinessInfo,
    method: 'POST',
    data: parameter
  })
}


/**
 * 获得全部商家分类
 * @returns {AxiosPromise}
 */
export function getAllType() {
  return axios({
    url: business.GetAllBusinessType,
    method: 'get'
  })
}

/**
 * 添加类别
 * @param param
 * @returns {*}
 */
export function addBusinessType(param) {
  return axios({
    url: business.AddBusinessType,
    method: 'post',
    data: param
  })
}

/**
 * 删除店铺类别
 * @param param
 *  {
 *     cid:11111
 *  }
 * @returns {*}
 */
export function deleteBusinessType(param) {
  return axios({
    url: business.DelBusinessType + param.cid,
    method: 'delete'
  })
}

/**
 * 获得食品
 * @param param
 * {
 *   id
 * }
 * @returns {AxiosPromise}
 */
export function getBusinessFood(param) {
  return axios({
    url: business.GetBusinessFood + param.id,
    method: 'get'
  })
}

/**
 * 删除食品
 * @param param
 * {
 *   id
 * }
 * @returns {AxiosPromise}
 */
export function delBusinessFood(param) {
  return axios({
    url: business.DelBusinessFood + param.id,
    method: 'delete'
  })
}

/**
 * 添加食品
 * @param param
 * {
	"detail": "",
	"kindId": 0,
	"name": "",
	"pic": "",
	"price": 0
}
 * @returns {AxiosPromise}
 */
export function addBusinessFood(param) {
  return axios({
    url: ' http://101.200.160.17:8100/food',
    method: 'post',
    data: param
  })
}

/**
 * 根据店铺id获得食品分类
 * @param param
 * {
 *   cid
 * }
 * @returns {AxiosPromise}
 */
export function getBusinessFoodType(param) {
  return axios({
    url: business.GetBusinessFoodType + param.cid,
    method: 'get'
  })
}

/**
 * 添加食品分类
 * @param param
 * {
	"id": 0,
	"name": "",
	"store_id": 0
}
 * @returns {AxiosPromise}
 */
export function addBusinessFoodType(param) {
  return axios({
    url: business.AddBusinessFoodType,
    method: 'post',
    data: param
  })
}