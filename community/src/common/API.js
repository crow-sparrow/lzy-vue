// var baseUrl = '/api';
var baseUrl = '';
//登录请求
var login = baseUrl + '/login';
//管理员管理
var findManage = baseUrl + '/findManage ';
var addManage = baseUrl + '/addManage';
var delManage = baseUrl + '/delManage';
var updateManage = baseUrl + '/updateManage';
//轮播图管理
var addBanner = baseUrl + '/addBanner';
var banner = baseUrl + '/banner';
var delBanner = baseUrl + '/delBanner';
//家教管理
var teacherBanner = baseUrl + '/teacherBanner';
var addTeacherBanner = baseUrl + '/addTeacherBanner';
var delTeacherBanner = baseUrl + '/delTeacherBanner';
var addTeacherType = baseUrl + '/addTeacherType';
var teacherType = baseUrl + '/teacherType';
var delTeacherType = baseUrl + '/delTeacherType';
var teacherTop = baseUrl + '/teacherTop';
var delTeacherTop = baseUrl + '/delTeacherTop';
var addTeacherTop = baseUrl + '/addTeacherTop';
//水站管理
var findWater = baseUrl + '/findWater';
var addWater = baseUrl + '/addWater';
var delWater = baseUrl + '/delWater';
var updateWater = baseUrl + '/updateWater';
var findComment = baseUrl + '/findComment';
var delComment = baseUrl + '/delComment';
//维修管理
var findRepair = baseUrl + '/findRepair';
var delRepair = baseUrl + '/delRepair';
var updateRepair = baseUrl + '/updateRepair';
var addRepair = baseUrl + '/addRepair';
var findRepairComment = baseUrl + '/findRepairComment';
var delRepairComment = baseUrl + '/delRepairComment';
//修改密码
var changePassManage = baseUrl + '/changePassManage';
//家政管理
var addHomeWorker = baseUrl + '/addHomeWorker';
var homeBanner = baseUrl + '/homeBanner';
var delHomeBanner = baseUrl + '/delHomeBanner';
var findHomeWorker = baseUrl + '/findHomeWorker';
var delHomeWorker = baseUrl + '/delHomeWorker';
var updateHomeWorker = baseUrl + '/updateHomeWorker';
var addHomeBanner = baseUrl + '/addHomeBanner';
var getHomeType = baseUrl + '/getHomeType';
var getQualification = baseUrl + '/getQualification';
//退出登录
var exit = baseUrl + '/exit'

export default {
  login,
  findManage,
  addManage,
  delManage,
  updateManage,
  addBanner,
  banner,
  delBanner,
  teacherBanner,
  addTeacherBanner,
  delTeacherBanner,
  addTeacherType,
  teacherType,
  delTeacherType,
  teacherTop,
  delTeacherTop,
  addTeacherTop,
  findWater,
  addWater,
  delWater,
  updateWater,
  findComment,
  delComment,
  findRepair,
  delRepair,
  updateRepair,
  addRepair,
  findRepairComment,
  delRepairComment,
  changePassManage,
  addHomeWorker,
  findHomeWorker,
  delHomeWorker,
  updateHomeWorker,
  homeBanner,
  delHomeBanner,
  addHomeBanner,
  getHomeType,
  getQualification,
  exit
}
