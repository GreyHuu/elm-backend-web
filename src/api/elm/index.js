const URL_PREFIX = 'http://101.200.160.17:8100'
//用户管理
const user = {
  Login: URL_PREFIX + '/user/login',
  GetAllUser: URL_PREFIX + '/user/get_list',
  DelUser: URL_PREFIX + '/user/delete/',
  GetUserInfo: URL_PREFIX + '/user/get_List/',
  ChangeUser: URL_PREFIX + '/user/info_user',
  SearchUserByName: URL_PREFIX + '/user/getByName',
}
//商家管理
const business = {
  GetAllBusiness: URL_PREFIX + '/store/page',
  DelBusiness: URL_PREFIX + '/store/del/',
  ChangeBusinessInfo: URL_PREFIX + '/store/info/change',
  GetBusinessInfoById: URL_PREFIX + '/store/info/get/',
  SearchBusinessByName: URL_PREFIX + '/store/search',
  GetAllBusinessType: URL_PREFIX + '/category/all',
  AddBusinessType: URL_PREFIX + '/category',
  DelBusinessType: URL_PREFIX + '/category/',
  GetBusinessFood:URL_PREFIX+"/food/store/",
  DelBusinessFood:URL_PREFIX+" /food/",
  AddBusinessFood:URL_PREFIX+" /food",
  GetBusinessFoodType:URL_PREFIX+"/kind/store/",
  AddBusinessFoodType:URL_PREFIX+"/kind"
}
//订单管理
const order = {
  GetAllOrder: URL_PREFIX + '/t-order/',
  DelOrder: URL_PREFIX + '/t-order/',
  SearchOrder: URL_PREFIX + '/t-order/blurry/',
}
//账目管理
const account = {
  GetAllReadingGroup: URL_PREFIX + '/reading/get-all-groups'
}
export {
  user,
  business,
  order,
  account
}
