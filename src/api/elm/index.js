const URL_PREFIX = 'http://101.200.160.17:8100'
//用户管理
const user = {
  Login: URL_PREFIX + '/users/user'
}
//商家管理
const business = {
  GetAllBusiness: URL_PREFIX + '/store/page'
}
//订单管理
const order = {
  //获得全部的商家 分页
  GetAllBusiness: URL_PREFIX + '/store/page'
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
