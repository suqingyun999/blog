import request from '../request'

// 登录
export function login(data) {
  return request({
    url: `/users/login`,
    method: 'post',
    data,
  })
}

// 首页
export function getHome() {
  return request({
    url: `/home/detail`,
    method: 'get',
  })
}
// 更新首页
export function updateHome(data) {
  return request({
    url: `/home/update`,
    method: 'post',
    data,
  })
}

// 关于
export function getAbout() {
  return request({
    url: `/about/detail`,
    method: 'get',
  })
}
// 更新关于
export function updateAbout(data) {
  return request({
    url: `/about/update`,
    method: 'post',
    data,
  })
}

// 获取文章内容列表
export function getContentList(data) {
  return request({
    url: `/content/list`,
    method: 'post',
    data,
  })
}

// 删除文章内容列表
export function delContentList(id) {
  return request({
    url: `/content/delete?id=${id}`,
    method: 'get',
  })
}

// 获取文章内容详情
export function getContentDetail(id) {
  return request({
    url: `/content/detail?id=${id}`,
    method: 'get',
  })
}

// 更新文章内容
export function updateContent(data) {
  return request({
    url: `/content/update`,
    method: 'post',
    data,
  })
}

// 新增文章内容
export function addContent(data) {
  return request({
    url: `/content/add`,
    method: 'post',
    data,
  })
}

// 获取留言列表
export function getMessageList(data) {
  return request({
    url: `/message/list`,
    method: 'post',
    data,
  })
}

// 删除留言列表
export function delMessageList(id) {
  return request({
    url: `/message/delete?id=${id}`,
    method: 'get',
  })
}

// 获取留言详情
export function getMessageDetail(id) {
  return request({
    url: `/message/detail?id=${id}`,
    method: 'get',
  })
}

// 更新留言内容
export function updateMessage(data) {
  return request({
    url: `/message/update`,
    method: 'post',
    data,
  })
}

// 新增留言内容
export function addMessage(data) {
  return request({
    url: `/message/add`,
    method: 'post',
    data,
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: `/users/userInfo`,
    method: 'get',
  })
}

// 更新用户信息
export function updateUserInfo(data) {
  return request({
    url: `/users/updateUserInfo`,
    method: 'post',
    data,
  })
}

// 获取朋友圈
export function getSelf(data) {
  return request({
    url: `/self/selfData`,
    method: 'post',
    data,
  })
}

// 新增朋友圈
export function addSelf(data) {
  return request({
    url: `/self/selfAdd`,
    method: 'post',
    data,
  })
}

// 新增评论
export function commentadd(data) {
  return request({
    url: `/self/commentadd`,
    method: 'post',
    data,
  })
}

// 删除朋友圈
export function selfDel(id) {
  return request({
    url: `/self/selfDel?id=` + id,
    method: 'get',
  })
}

// 删除评论
export function commentDel(id) {
  return request({
    url: `/self/commentDel?id=` + id,
    method: 'get',
  })
}

// 上传图片
export function uploadImage(formdData) {
  return request({
    method: 'post',
    url: '/upload',
    data: formdData,
    //设置Content-Type类型
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
